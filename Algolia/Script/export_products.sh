#!/bin/bash

SPACE_ID="xbq8te6l92zd"
ACCESS_TOKEN="YOXBZ5FkOdbzosHpzUX49zPvKCC_2VZW-GYbNVIcqb8"

ALGOLIA_APP_ID="IN6J4FC7B1"
ALGOLIA_API_KEY="fc490f6be6dc5dd3308da42b12362b7d"
ALGOLIA_INDEX_NAME="tam_page_french"
ALGOLIA_INDEX_NAME_EN="tam_page_english"

PAGE_SIZE=1000
SKIP=0
PAGE=1
FILES=()

echo "⬇️ Starting product download…"

while true; do
  FILE="products_raw_${PAGE}.json"
  echo "⬇️ Downloading page $PAGE (records $SKIP to $((SKIP + PAGE_SIZE - 1)))…"
  curl -s \
    "https://cdn.contentful.com/spaces/$SPACE_ID/environments/master/entries?access_token=$ACCESS_TOKEN&limit=$PAGE_SIZE&include=3&skip=$SKIP" \
    > "$FILE"

  COUNT=$(jq '.items | length' "$FILE")
  FILES+=("$FILE")

  if [ "$COUNT" -lt "$PAGE_SIZE" ]; then
    echo "📄 Last page ($COUNT records)."
    break
  fi

  SKIP=$((SKIP + PAGE_SIZE))
  PAGE=$((PAGE + 1))
done

echo "🔗 Merging JSONs…"

jq -s '
  {
    items: (map(.items) | add),
    includes: {
      Entry: (map(.includes.Entry // []) | add),
      Asset: (map(.includes.Asset // []) | add)
    }
  }
' "${FILES[@]}" > products_raw.json

echo "🎯 Transforming JSON for Algolia…"

jq -r '
  def slugOrEmpty($entry):
    if $entry == null or $entry.fields.slug == null then "" else $entry.fields.slug end;

  . as $root |
  [
    .items[] |
    select((.sys.contentType.sys.id == "product" or .sys.contentType.sys.id == "download")) |
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
      name: (if $item.sys.contentType.sys.id == "download" then $item.fields.title else $item.fields.name end),
      slug: $item.fields.slug,
      type: (if $item.sys.contentType.sys.id == "product" then "product" else "catalog" end),
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
          (
            ($root.includes.Asset[]
              | select(.sys.id == ($item.fields.file.sys.id))
              | .fields.file.url // ""
            ) | if startswith("//") then "https:" + . else . end
          )
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
  ]
' products_raw.json > products_algolia.json

echo "✅ Exported to products_algolia.json"

echo "📦 Preparing data for Algolia…"

jq '{ requests: [.[] | { action: "addObject", body: . }] }' products_algolia.json > products_batch.json

echo "🚀 Sending data to Algolia (fr)…"

curl -s -X POST \
  -H "X-Algolia-API-Key: $ALGOLIA_API_KEY" \
  -H "X-Algolia-Application-Id: $ALGOLIA_APP_ID" \
  -H "Content-Type: application/json" \
  --data-binary @products_batch.json \
  "https://$ALGOLIA_APP_ID-dsn.algolia.net/1/indexes/$ALGOLIA_INDEX_NAME/batch"

echo "✅ Data sent to French index: $ALGOLIA_INDEX_NAME."

echo "🚀 Sending data to Algolia (en)…"

curl -s -X POST \
  -H "X-Algolia-API-Key: $ALGOLIA_API_KEY" \
  -H "X-Algolia-Application-Id: $ALGOLIA_APP_ID" \
  -H "Content-Type: application/json" \
  --data-binary @products_batch.json \
  "https://$ALGOLIA_APP_ID-dsn.algolia.net/1/indexes/$ALGOLIA_INDEX_NAME_EN/batch"

echo "✅ Data sent to English index: $ALGOLIA_INDEX_NAME_EN."
