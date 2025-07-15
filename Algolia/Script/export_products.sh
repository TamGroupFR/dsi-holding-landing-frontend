#!/bin/bash

SPACE_ID="xbq8te6l92zd"
ACCESS_TOKEN="YOXBZ5FkOdbzosHpzUX49zPvKCC_2VZW-GYbNVIcqb8"

ALGOLIA_APP_ID="IN6J4FC7B1"
ALGOLIA_API_KEY="fc490f6be6dc5dd3308da42b12362b7d"
ALGOLIA_INDEX_NAME="tam_page_french"
ALGOLIA_INDEX_NAME_EN="tam_page_english"

LIMIT=1000

echo "⬇️ Obteniendo número total de productos..."

TOTAL=$(curl -s "https://cdn.contentful.com/spaces/$SPACE_ID/environments/master/entries?access_token=$ACCESS_TOKEN&limit=1" | jq '.total')

echo "ℹ️ Total de objetos: $TOTAL"

# Calcular número de páginas
PAGES=$(( (TOTAL + LIMIT - 1) / LIMIT ))

echo "ℹ️ Número de páginas a descargar: $PAGES"

FILES=()

for ((i=0; i<PAGES; i++)); do
  SKIP=$((i * LIMIT))
  echo "⬇️ Descargando página $((i+1)) ($SKIP-$((SKIP + LIMIT -1)))..."
  FILE="../Files/products_raw_$((i+1)).json"
  curl -s "https://cdn.contentful.com/spaces/$SPACE_ID/environments/master/entries?access_token=$ACCESS_TOKEN&limit=$LIMIT&include=3&skip=$SKIP" > "$FILE"
  FILES+=("$FILE")
done

echo "🔗 Uniendo JSONs…"

jq -s '
{
  items: (map(.items) | add),
  includes: {
    Entry: (map(.includes.Entry // []) | add),
    Asset: (map(.includes.Asset // []) | add)
  }
}
' "${FILES[@]}" > ../Files/products_raw.json

echo "🎯 Transformando JSON para Algolia..."

jq -r '
def slugOrEmpty($entry):
  if $entry == null or $entry.fields.slug == null then "" else $entry.fields.slug end;

def getFileUrl($root; $fileId):
  if $fileId == null then "NO_FILE_FOUND"
  else
    (
      ($root.includes.Asset[] | select(.sys.id == $fileId) | .fields.file.url) //
      ($root.items[] | select(.sys.id == $fileId) | .fields.file.url) //
      "NO_FILE_FOUND"
    ) | if . == null or . == "" then "NO_FILE_FOUND" else (if startswith("//") then "https:" + . else . end) end
  end;

. as $root |

(
  [
    # productos
    $root.items[] |
    select(.sys.contentType.sys.id == "product") |
    . as $item |

    ($item.fields.subcategory?.sys.id // null) as $lvl3id |
    ($root.items[] | select(.sys.id == $lvl3id) | .fields.subsubcategory?.sys.id // null) as $lvl4id |
    ($item.sys.contentType.sys.id == "product" and $lvl3id != null) as $isProduct |

    ($isProduct | if . then
      ($root.items[] | select(
        (.fields.subcategories != null and (.fields.subcategories | type == "array")) and
        any(.fields.subcategories[]; .sys.id == $lvl3id)
      ))
    else null end) as $lvl2 |

    ($lvl2.sys.id // null) as $lvl2id |

    ($isProduct | if . and ($lvl2id != null) then
      ($root.items[] | select(
        (.fields.subcategories != null and (.fields.subcategories | type == "array")) and
        any(.fields.subcategories[]; .sys.id == $lvl2id)
      ))
    else null end) as $lvl1 |

    {
      objectID: $item.sys.id,
      name: ($item.fields.name // ""),
      slug: ($item.fields.slug // ""),
      type: "product",
      url: (
        if $isProduct then
          ("/all-products/" +
            ( [
                slugOrEmpty($lvl1),
                slugOrEmpty($lvl2),
                (
                  ($root.items[] | select(.sys.id == $lvl4id) | .fields.slug) //
                  ($root.items[] | select(.sys.id == $lvl3id) | .fields.slug) //
                  ""
                ),
                $item.fields.slug
              ]
              | map(select(length > 0))
              | join("/")
            )
          )
        else
          "NO_FILE_FOUND"
        end
      ),
      subcategory: (
        if $isProduct then {
          category: null,
          name: (
            ($root.items[] | select(.sys.id == $lvl4id) | .fields.name) //
            ($root.items[] | select(.sys.id == $lvl3id) | .fields.name) //
            null
          )
        } else null end
      ),
      category: (
        if $isProduct then {
          category: slugOrEmpty($lvl1),
          subcategory: slugOrEmpty($lvl2),
          subsubcategory: (
            (
              ($root.items[] | select(.sys.id == $lvl4id) | { name: .fields.name, slug: slugOrEmpty(.) }) //
              ($root.items[] | select(.sys.id == $lvl3id) | { name: .fields.name, slug: slugOrEmpty(.) })
            )
          )
        } else null end
      )
    }
  ] +
  [
    # downloads
    $root.items[] |
    select(.sys.contentType.sys.id == "download") |
    {
      objectID: .sys.id,
      name: (.fields.title // ""),
      slug: (.fields.slug // ""),
      type: "catalog",
      url: getFileUrl($root; (.fields.file.sys.id // null))
    }
  ]
)
' ../Files/products_raw.json > products_algolia.json

echo "✅ Exportado a products_algolia.json"

# Transformar products_algolia.json al formato batch de Algolia
echo "🔄 Transformando JSON a formato batch para Algolia..."
jq '{ requests: [ .[] | { action: "addObject", body: . } ] }' products_algolia.json > ../Files/products_algolia_batch.json

# Subir batch al índice francés
echo "⬆️ Subiendo batch al índice francés ($ALGOLIA_INDEX_NAME)..."
RESPONSE_FR=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST \
  -H "X-Algolia-API-Key: $ALGOLIA_API_KEY" \
  -H "X-Algolia-Application-Id: $ALGOLIA_APP_ID" \
  -H "Content-Type: application/json" \
  --data-binary @../Files/products_algolia_batch.json \
  "https://$ALGOLIA_APP_ID-dsn.algolia.net/1/indexes/$ALGOLIA_INDEX_NAME/batch")
if [ "$RESPONSE_FR" -ge 200 ] && [ "$RESPONSE_FR" -lt 300 ]; then
  echo "✅ Batch subido correctamente al índice francés."
else
  echo "❌ Error al subir el batch al índice francés. Código HTTP: $RESPONSE_FR"
fi

# Subir batch al índice inglés
echo "⬆️ Subiendo batch al índice inglés ($ALGOLIA_INDEX_NAME_EN)..."
RESPONSE_EN=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST \
  -H "X-Algolia-API-Key: $ALGOLIA_API_KEY" \
  -H "X-Algolia-Application-Id: $ALGOLIA_APP_ID" \
  -H "Content-Type: application/json" \
  --data-binary @../Files/products_algolia_batch.json \
  "https://$ALGOLIA_APP_ID-dsn.algolia.net/1/indexes/$ALGOLIA_INDEX_NAME_EN/batch")
if [ "$RESPONSE_EN" -ge 200 ] && [ "$RESPONSE_EN" -lt 300 ]; then
  echo "✅ Batch subido correctamente al índice inglés."
else
  echo "❌ Error al subir el batch al índice inglés. Código HTTP: $RESPONSE_EN"
fi

echo "🚀 Proceso de subida a Algolia finalizado."