import { settings } from "./settings.js";
import { displaySpinner, displayError } from "./shared.js";

document.querySelector("#orderBy").addEventListener("change", handleOrderBy);
document.querySelector("#search").addEventListener("input", handleSearch);

let data = [];

// --------------------------------------------------------------------------

function handleSearch(event) {
  const text = event.target.value;
  const filtered = data.filter((x) => x.name.toLowerCase().includes(text.toLowerCase()));
  updateProducts(filtered);
}
// -----------------------------------------------------------------------------

function handleOrderBy(event) {
  const oby = event.target.value;

  if (oby === "name") {
    // -----------sort by name + update UI---------------------------------
    // data.sort((a, b) => (a.name > b.name ? 1 : -1));
    data.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
    // updateProducts(data);

    // data.sort(function (a, b) {
    //   if (a.name > b.name) {
    //     return 1;
    //   } else if (a.name < b.name) {
    //     return -1;
    //   } else {
    //     return 0;
    //   }
    // });
    // updateProducts(data);
    // -----------sort the price asc + update the UI------------------------
  } else if (oby === "price-asc") {
    data.sort(function (p1, p2) {
      //   console.log(p1.price, p2.price);
      //   if (parseFloat(p1.price) === parseFloat(p2.price)) {
      //     return 0;
      //   } else if (parseFloat(p1.price) > parseFloat(p2.price)) {
      //     return 1;
      //   } else if (parseFloat(p1.price) < parseFloat(p2.price)) {
      //     return -1;
      //   }
      return p1.price - p2.price;
    });
    // updateProducts(data);
    // -----------sort the price desc + update the UI------------------------
  } else if (oby === "price-desc") {
    data.sort(function (p1, p2) {
      return p2.price - p1.price;
    });
  }

  updateProducts(data);
}

// -----------------------------------------------------------------------------------

async function displayJackets() {
  try {
    displaySpinner(true);
    document.querySelector("#filters").style.display = "none";

    displayError(false);

    const url = `${settings.wp_baseurl}/wp-json/wc/v3/products?consumer_key=${settings.woo.consumer_key}&consumer_secret=${settings.woo.consumer_secret}`;

    console.log(url);
    const response = await fetch(url);
    data = await response.json();
    console.log(data);

    data.sort(function (a, b) {
      const sortOrder = a.name.localeCompare(b.name);
      return sortOrder;
    });
  } catch (e) {
    displayError(true);
    document.querySelector("#filters").style.visibility = "hidden";
  } finally {
    displaySpinner(false);
    document.querySelector("#filters").style.display = "flex";
  }
  updateProducts(data);
}
// ------------------------------------------------------------------------------------

function updateProducts(data) {
  const products = document.querySelector("#products");
  products.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const template = document.querySelector("#product");
    const product = template.content.cloneNode(true);

    product.querySelector("h4").innerText = item.name;
    product.querySelector("img").alt = item.name;
    product.querySelector("img").src = item.images[0].src;
    product.querySelector(".box-dec").innerHTML = item.description;
    product.querySelector(".price").innerText = item.price;
    product.querySelector(".regular-price").innerText = item.regular_price;

    let sale = item.on_sale;
    if (sale === false) {
      product.querySelector(".box-sale").style.display = "none";
      product.querySelector(".regular-price").style.display = "none";
    } else {
      product.querySelector(".box-sale").style.display = "block";
      console.log("Sale");
      product.querySelector(".regular-price").style.display = "block";
    }

    const links = product.querySelectorAll("a");
    for (let ia = 0; ia < links.length; ia++) {
      const link = links[ia];

      link.href = `product.html?id=${item.id}`;
    }

    products.appendChild(product);
  }
}

displayJackets();

/*
[
    {
        "id": 26,
        "name": "Rainy Days Silverbreeze Jacket",
        "slug": "rainy-days-silverbreeze-jacket",
        "permalink": "https:\/\/flower-power.local\/product\/rainy-days-silverbreeze-jacket\/",
        "date_created": "2023-10-13T19:34:44",
        "date_created_gmt": "2023-10-13T19:34:44",
        "date_modified": "2023-10-13T19:36:22",
        "date_modified_gmt": "2023-10-13T19:36:22",
        "type": "simple",
        "status": "publish",
        "featured": false,
        "catalog_visibility": "visible",
        "description": "<p>The Women's Rainy Days Silverbreeze jacket is the ultimate waterproof rain jacket for those stormy weather conditions.<\/p>\n",
        "short_description": "<p>Lorem ipsum dolor sit amet. Et ullam quasi ea veritatis odit nam omnis pariatur est quia rerum qui labore omnis? Qui illo ipsa id voluptate itaque aut debitis tempora aut ducimus rerum quo facilis fuga est veniam voluptates et dolorum modi.<\/p>\n",
        "sku": "0001J-1",
        "price": "752",
        "regular_price": "900",
        "sale_price": "752",
        "date_on_sale_from": "2023-10-12T00:00:00",
        "date_on_sale_from_gmt": "2023-10-12T00:00:00",
        "date_on_sale_to": "2023-10-31T23:59:59",
        "date_on_sale_to_gmt": "2023-10-31T23:59:59",
        "on_sale": true,
        "purchasable": true,
        "total_sales": 0,
        "virtual": false,
        "downloadable": false,
        "downloads": [],
        "download_limit": -1,
        "download_expiry": -1,
        "external_url": "",
        "button_text": "",
        "tax_status": "taxable",
        "tax_class": "",
        "manage_stock": true,
        "stock_quantity": 60,
        "backorders": "no",
        "backorders_allowed": false,
        "backordered": false,
        "low_stock_amount": null,
        "sold_individually": false,
        "weight": "0.650",
        "dimensions": {
            "length": "50",
            "width": "20",
            "height": "30"
        },
        "shipping_required": true,
        "shipping_taxable": true,
        "shipping_class": "",
        "shipping_class_id": 0,
        "reviews_allowed": true,
        "average_rating": "0.00",
        "rating_count": 0,
        "upsell_ids": [],
        "cross_sell_ids": [],
        "parent_id": 0,
        "purchase_note": "",
        "categories": [
            {
                "id": 16,
                "name": "Outdoor",
                "slug": "outdoor"
            },
            {
                "id": 15,
                "name": "Uncategorized",
                "slug": "uncategorized"
            }
        ],
        "tags": [
            {
                "id": 17,
                "name": "Jacket",
                "slug": "jacket"
            }
        ],
        "images": [
            {
                "id": 21,
                "date_created": "2023-10-13T19:33:48",
                "date_created_gmt": "2023-10-13T19:33:48",
                "date_modified": "2023-10-13T19:33:48",
                "date_modified_gmt": "2023-10-13T19:33:48",
                "src": "https:\/\/flower-power.local\/wp-content\/uploads\/2023\/10\/4-silverbreeze-jacket.jpg",
                "name": "4-silverbreeze-jacket",
                "alt": ""
            }
        ],
        "attributes": [],
        "default_attributes": [],
        "variations": [],
        "grouped_products": [],
        "menu_order": 0,
        "price_html": "<del aria-hidden=\"true\"><span class=\"woocommerce-Price-amount amount\"><bdi><span class=\"woocommerce-Price-currencySymbol\">&#107;&#114;<\/span>&nbsp;900,00<\/bdi><\/span><\/del> <ins><span class=\"woocommerce-Price-amount amount\"><bdi><span class=\"woocommerce-Price-currencySymbol\">&#107;&#114;<\/span>&nbsp;752,00<\/bdi><\/span><\/ins>",
        "related_ids": [
            16
        ],
        "meta_data": [
            {
                "id": 86,
                "key": "_yoast_wpseo_primary_product_cat",
                "value": "16"
            },
            {
                "id": 87,
                "key": "_yoast_wpseo_content_score",
                "value": "90"
            },
            {
                "id": 88,
                "key": "_yoast_wpseo_estimated-reading-time-minutes",
                "value": "1"
            },
            {
                "id": 89,
                "key": "_yoast_wpseo_wordproof_timestamp",
                "value": ""
            }
        ],
        "stock_status": "instock",
        "has_options": false,
        "post_password": "",
        "yoast_head": "<!-- This site is optimized with the Yoast SEO plugin v21.3 - https:\/\/yoast.com\/wordpress\/plugins\/seo\/ -->\r\n<title>Rainy Days Silverbreeze Jacket - flower power<\/title>\r\n<!-- Admin only notice: this page does not show a meta description because it does not have one, either write it for this page specifically or go into the [Yoast SEO - Settings] menu and set up a template. -->\r\n<meta name=\"robots\" content=\"index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\" \/>\r\n<link rel=\"canonical\" href=\"http:\/\/flower-power.local\/product\/rainy-days-silverbreeze-jacket\/\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta property=\"og:locale\" content=\"en_US\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta property=\"og:type\" content=\"article\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta property=\"og:title\" content=\"Rainy Days Silverbreeze Jacket - flower power\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta property=\"og:description\" content=\"Lorem ipsum dolor sit amet. Et ullam quasi ea veritatis odit nam omnis pariatur est quia rerum qui labore omnis? Qui illo ipsa id voluptate itaque aut debitis tempora aut ducimus rerum quo facilis fuga est veniam voluptates et dolorum modi.\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta property=\"og:url\" content=\"http:\/\/flower-power.local\/product\/rainy-days-silverbreeze-jacket\/\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta property=\"og:site_name\" content=\"flower power\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta property=\"article:modified_time\" content=\"2023-10-13T19:36:22+00:00\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta property=\"og:image\" content=\"http:\/\/flower-power.local\/wp-content\/uploads\/2023\/10\/4-silverbreeze-jacket.jpg\" class=\"yoast-seo-meta-tag\" \/>\r\n\t<meta property=\"og:image:width\" content=\"900\" class=\"yoast-seo-meta-tag\" \/>\r\n\t<meta property=\"og:image:height\" content=\"937\" class=\"yoast-seo-meta-tag\" \/>\r\n\t<meta property=\"og:image:type\" content=\"image\/jpeg\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta name=\"twitter:card\" content=\"summary_large_image\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta name=\"twitter:label1\" content=\"Est. reading time\" class=\"yoast-seo-meta-tag\" \/>\n\t<meta name=\"twitter:data1\" content=\"1 minute\" class=\"yoast-seo-meta-tag\" \/>\r\n<script type=\"application\/ld+json\" class=\"yoast-schema-graph\">{\"@context\":\"https:\/\/schema.org\",\"@graph\":[{\"@type\":\"WebPage\",\"@id\":\"http:\/\/flower-power.local\/product\/rainy-days-silverbreeze-jacket\/\",\"url\":\"http:\/\/flower-power.local\/product\/rainy-days-silverbreeze-jacket\/\",\"name\":\"Rainy Days Silverbreeze Jacket - flower power\",\"isPartOf\":{\"@id\":\"http:\/\/flower-power.local\/#website\"},\"datePublished\":\"2023-10-13T19:34:44+00:00\",\"dateModified\":\"2023-10-13T19:36:22+00:00\",\"breadcrumb\":{\"@id\":\"http:\/\/flower-power.local\/product\/rainy-days-silverbreeze-jacket\/#breadcrumb\"},\"inLanguage\":\"en-US\",\"potentialAction\":[{\"@type\":\"ReadAction\",\"target\":[\"http:\/\/flower-power.local\/product\/rainy-days-silverbreeze-jacket\/\"]}]},{\"@type\":\"BreadcrumbList\",\"@id\":\"http:\/\/flower-power.local\/product\/rainy-days-silverbreeze-jacket\/#breadcrumb\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https:\/\/flower-power.local\/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Products\",\"item\":\"https:\/\/flower-power.local\/products\/\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"Rainy Days Silverbreeze Jacket\"}]},{\"@type\":\"WebSite\",\"@id\":\"http:\/\/flower-power.local\/#website\",\"url\":\"http:\/\/flower-power.local\/\",\"name\":\"flower power\",\"description\":\"\",\"potentialAction\":[{\"@type\":\"SearchAction\",\"target\":{\"@type\":\"EntryPoint\",\"urlTemplate\":\"http:\/\/flower-power.local\/?s={search_term_string}\"},\"query-input\":\"required name=search_term_string\"}],\"inLanguage\":\"en-US\"}]}<\/script>\r\n<!-- \/ Yoast SEO plugin. -->",
        "yoast_head_json": {
            "title": "Rainy Days Silverbreeze Jacket - flower power",
            "robots": {
                "index": "index",
                "follow": "follow",
                "max-snippet": "max-snippet:-1",
                "max-image-preview": "max-image-preview:large",
                "max-video-preview": "max-video-preview:-1"
            },
            "canonical": "http:\/\/flower-power.local\/product\/rainy-days-silverbreeze-jacket\/",
            "og_locale": "en_US",
            "og_type": "article",
            "og_title": "Rainy Days Silverbreeze Jacket - flower power",
            "og_description": "Lorem ipsum dolor sit amet. Et ullam quasi ea veritatis odit nam omnis pariatur est quia rerum qui labore omnis? Qui illo ipsa id voluptate itaque aut debitis tempora aut ducimus rerum quo facilis fuga est veniam voluptates et dolorum modi.",
            "og_url": "http:\/\/flower-power.local\/product\/rainy-days-silverbreeze-jacket\/",
            "og_site_name": "flower power",
            "article_modified_time": "2023-10-13T19:36:22+00:00",
            "og_image": [
                {
                    "width": 900,
                    "height": 937,
                    "url": "http:\/\/flower-power.local\/wp-content\/uploads\/2023\/10\/4-silverbreeze-jacket.jpg",
                    "type": "image\/jpeg"
                }
            ],
            "twitter_card": "summary_large_image",
            "twitter_misc": {
                "Est. reading time": "1 minute"
            },
            "schema": {
                "@context": "https:\/\/schema.org",
                "@graph": [
                    {
                        "@type": "WebPage",
                        "@id": "http:\/\/flower-power.local\/product\/rainy-days-silverbreeze-jacket\/",
                        "url": "http:\/\/flower-power.local\/product\/rainy-days-silverbreeze-jacket\/",
                        "name": "Rainy Days Silverbreeze Jacket - flower power",
                        "isPartOf": {
                            "@id": "http:\/\/flower-power.local\/#website"
                        },
                        "datePublished": "2023-10-13T19:34:44+00:00",
                        "dateModified": "2023-10-13T19:36:22+00:00",
                        "breadcrumb": {
                            "@id": "http:\/\/flower-power.local\/product\/rainy-days-silverbreeze-jacket\/#breadcrumb"
                        },
                        "inLanguage": "en-US",
                        "potentialAction": [
                            {
                                "@type": "ReadAction",
                                "target": [
                                    "http:\/\/flower-power.local\/product\/rainy-days-silverbreeze-jacket\/"
                                ]
                            }
                        ]
                    },
                    {
                        "@type": "BreadcrumbList",
                        "@id": "http:\/\/flower-power.local\/product\/rainy-days-silverbreeze-jacket\/#breadcrumb",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https:\/\/flower-power.local\/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Products",
                                "item": "https:\/\/flower-power.local\/products\/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": "Rainy Days Silverbreeze Jacket"
                            }
                        ]
                    },
                    {
                        "@type": "WebSite",
                        "@id": "http:\/\/flower-power.local\/#website",
                        "url": "http:\/\/flower-power.local\/",
                        "name": "flower power",
                        "description": "",
                        "potentialAction": [
                            {
                                "@type": "SearchAction",
                                "target": {
                                    "@type": "EntryPoint",
                                    "urlTemplate": "http:\/\/flower-power.local\/?s={search_term_string}"
                                },
                                "query-input": "required name=search_term_string"
                            }
                        ],
                        "inLanguage": "en-US"
                    }
                ]
            }
        },
        "_links": {
            "self": [
                {
                    "href": "https:\/\/flower-power.local\/wp-json\/wc\/v3\/products\/26"
                }
            ],
            "collection": [
                {
                    "href": "https:\/\/flower-power.local\/wp-json\/wc\/v3\/products"
                }
            ]
        }
    },
    {
        "id": 16,
        "name": "Rainy Days Thunderbolt Jacket",
        "slug": "rainy-days-thunderbolt-jacket",
        "permalink": "https:\/\/flower-power.local\/product\/rainy-days-thunderbolt-jacket\/",
        "date_created": "2023-10-12T13:26:35",
        "date_created_gmt": "2023-10-12T13:26:35",
        "date_modified": "2023-10-13T19:34:20",
        "date_modified_gmt": "2023-10-13T19:34:20",
        "type": "simple",
        "status": "publish",
        "featured": false,
        "catalog_visibility": "visible",
        "description": "<p>The Women's Rainy Days Thunderbolt jacket is a sleek and stylish waterproof jacket perfect for any outdoor adventure.<\/p>\n",
        "short_description": "<p>Lorem ipsum dolor sit amet. Et ullam quasi ea veritatis odit nam omnis pariatur est quia rerum qui labore omnis? Qui illo ipsa id voluptate itaque aut debitis tempora aut ducimus rerum quo facilis fuga est veniam voluptates et dolorum modi.<\/p>\n",
        "sku": "0001J",
        "price": "752",
        "regular_price": "900",
        "sale_price": "752",
        "date_on_sale_from": "2023-10-12T00:00:00",
        "date_on_sale_from_gmt": "2023-10-12T00:00:00",
        "date_on_sale_to": "2023-10-31T23:59:59",
        "date_on_sale_to_gmt": "2023-10-31T23:59:59",
        "on_sale": true,
        "purchasable": true,
        "total_sales": 0,
        "virtual": false,
        "downloadable": false,
        "downloads": [],
        "download_limit": -1,
        "download_expiry": -1,
        "external_url": "",
        "button_text": "",
        "tax_status": "taxable",
        "tax_class": "",
        "manage_stock": true,
        "stock_quantity": 60,
        "backorders": "no",
        "backorders_allowed": false,
        "backordered": false,
        "low_stock_amount": null,
        "sold_individually": false,
        "weight": "0.650",
        "dimensions": {
            "length": "50",
            "width": "20",
            "height": "30"
        },
        "shipping_required": true,
        "shipping_taxable": true,
        "shipping_class": "",
        "shipping_class_id": 0,
        "reviews_allowed": true,
        "average_rating": "0.00",
        "rating_count": 0,
        "upsell_ids": [],
        "cross_sell_ids": [],
        "parent_id": 0,
        "purchase_note": "",
        "categories": [
            {
                "id": 16,
                "name": "Outdoor",
                "slug": "outdoor"
            },
            {
                "id": 15,
                "name": "Uncategorized",
                "slug": "uncategorized"
            }
        ],
        "tags": [
            {
                "id": 17,
                "name": "Jacket",
                "slug": "jacket"
            }
        ],
        "images": [
            {
                "id": 23,
                "date_created": "2023-10-13T19:33:49",
                "date_created_gmt": "2023-10-13T19:33:49",
                "date_modified": "2023-10-13T19:33:49",
                "date_modified_gmt": "2023-10-13T19:33:49",
                "src": "https:\/\/flower-power.local\/wp-content\/uploads\/2023\/10\/9-thunderbolt-jacket.jpg",
                "name": "9-thunderbolt-jacket",
                "alt": ""
            }
        ],
        "attributes": [],
        "default_attributes": [],
        "variations": [],
        "grouped_products": [],
        "menu_order": 0,
        "price_html": "<del aria-hidden=\"true\"><span class=\"woocommerce-Price-amount amount\"><bdi><span class=\"woocommerce-Price-currencySymbol\">&#107;&#114;<\/span>&nbsp;900,00<\/bdi><\/span><\/del> <ins><span class=\"woocommerce-Price-amount amount\"><bdi><span class=\"woocommerce-Price-currencySymbol\">&#107;&#114;<\/span>&nbsp;752,00<\/bdi><\/span><\/ins>",
        "related_ids": [
            26
        ],
        "meta_data": [
            {
                "id": 30,
                "key": "_yoast_wpseo_primary_product_cat",
                "value": "16"
            },
            {
                "id": 31,
                "key": "_yoast_wpseo_content_score",
                "value": "90"
            },
            {
                "id": 32,
                "key": "_yoast_wpseo_estimated-reading-time-minutes",
                "value": "1"
            },
            {
                "id": 33,
                "key": "_yoast_wpseo_wordproof_timestamp",
                "value": ""
            }
        ],
        "stock_status": "instock",
        "has_options": false,
        "post_password": "",
        "yoast_head": "<!-- This site is optimized with the Yoast SEO plugin v21.3 - https:\/\/yoast.com\/wordpress\/plugins\/seo\/ -->\r\n<title>Rainy Days Thunderbolt Jacket - flower power<\/title>\r\n<!-- Admin only notice: this page does not show a meta description because it does not have one, either write it for this page specifically or go into the [Yoast SEO - Settings] menu and set up a template. -->\r\n<meta name=\"robots\" content=\"index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1\" \/>\r\n<link rel=\"canonical\" href=\"http:\/\/flower-power.local\/product\/rainy-days-thunderbolt-jacket\/\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta property=\"og:locale\" content=\"en_US\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta property=\"og:type\" content=\"article\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta property=\"og:title\" content=\"Rainy Days Thunderbolt Jacket - flower power\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta property=\"og:description\" content=\"Lorem ipsum dolor sit amet. Et ullam quasi ea veritatis odit nam omnis pariatur est quia rerum qui labore omnis? Qui illo ipsa id voluptate itaque aut debitis tempora aut ducimus rerum quo facilis fuga est veniam voluptates et dolorum modi.\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta property=\"og:url\" content=\"http:\/\/flower-power.local\/product\/rainy-days-thunderbolt-jacket\/\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta property=\"og:site_name\" content=\"flower power\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta property=\"article:modified_time\" content=\"2023-10-13T19:34:20+00:00\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta property=\"og:image\" content=\"http:\/\/flower-power.local\/wp-content\/uploads\/2023\/10\/9-thunderbolt-jacket.jpg\" class=\"yoast-seo-meta-tag\" \/>\r\n\t<meta property=\"og:image:width\" content=\"810\" class=\"yoast-seo-meta-tag\" \/>\r\n\t<meta property=\"og:image:height\" content=\"810\" class=\"yoast-seo-meta-tag\" \/>\r\n\t<meta property=\"og:image:type\" content=\"image\/jpeg\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta name=\"twitter:card\" content=\"summary_large_image\" class=\"yoast-seo-meta-tag\" \/>\r\n<meta name=\"twitter:label1\" content=\"Est. reading time\" class=\"yoast-seo-meta-tag\" \/>\n\t<meta name=\"twitter:data1\" content=\"1 minute\" class=\"yoast-seo-meta-tag\" \/>\r\n<script type=\"application\/ld+json\" class=\"yoast-schema-graph\">{\"@context\":\"https:\/\/schema.org\",\"@graph\":[{\"@type\":\"WebPage\",\"@id\":\"http:\/\/flower-power.local\/product\/rainy-days-thunderbolt-jacket\/\",\"url\":\"http:\/\/flower-power.local\/product\/rainy-days-thunderbolt-jacket\/\",\"name\":\"Rainy Days Thunderbolt Jacket - flower power\",\"isPartOf\":{\"@id\":\"http:\/\/flower-power.local\/#website\"},\"datePublished\":\"2023-10-12T13:26:35+00:00\",\"dateModified\":\"2023-10-13T19:34:20+00:00\",\"breadcrumb\":{\"@id\":\"http:\/\/flower-power.local\/product\/rainy-days-thunderbolt-jacket\/#breadcrumb\"},\"inLanguage\":\"en-US\",\"potentialAction\":[{\"@type\":\"ReadAction\",\"target\":[\"http:\/\/flower-power.local\/product\/rainy-days-thunderbolt-jacket\/\"]}]},{\"@type\":\"BreadcrumbList\",\"@id\":\"http:\/\/flower-power.local\/product\/rainy-days-thunderbolt-jacket\/#breadcrumb\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https:\/\/flower-power.local\/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Products\",\"item\":\"https:\/\/flower-power.local\/products\/\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"Rainy Days Thunderbolt Jacket\"}]},{\"@type\":\"WebSite\",\"@id\":\"http:\/\/flower-power.local\/#website\",\"url\":\"http:\/\/flower-power.local\/\",\"name\":\"flower power\",\"description\":\"\",\"potentialAction\":[{\"@type\":\"SearchAction\",\"target\":{\"@type\":\"EntryPoint\",\"urlTemplate\":\"http:\/\/flower-power.local\/?s={search_term_string}\"},\"query-input\":\"required name=search_term_string\"}],\"inLanguage\":\"en-US\"}]}<\/script>\r\n<!-- \/ Yoast SEO plugin. -->",
        "yoast_head_json": {
            "title": "Rainy Days Thunderbolt Jacket - flower power",
            "robots": {
                "index": "index",
                "follow": "follow",
                "max-snippet": "max-snippet:-1",
                "max-image-preview": "max-image-preview:large",
                "max-video-preview": "max-video-preview:-1"
            },
            "canonical": "http:\/\/flower-power.local\/product\/rainy-days-thunderbolt-jacket\/",
            "og_locale": "en_US",
            "og_type": "article",
            "og_title": "Rainy Days Thunderbolt Jacket - flower power",
            "og_description": "Lorem ipsum dolor sit amet. Et ullam quasi ea veritatis odit nam omnis pariatur est quia rerum qui labore omnis? Qui illo ipsa id voluptate itaque aut debitis tempora aut ducimus rerum quo facilis fuga est veniam voluptates et dolorum modi.",
            "og_url": "http:\/\/flower-power.local\/product\/rainy-days-thunderbolt-jacket\/",
            "og_site_name": "flower power",
            "article_modified_time": "2023-10-13T19:34:20+00:00",
            "og_image": [
                {
                    "width": 810,
                    "height": 810,
                    "url": "http:\/\/flower-power.local\/wp-content\/uploads\/2023\/10\/9-thunderbolt-jacket.jpg",
                    "type": "image\/jpeg"
                }
            ],
            "twitter_card": "summary_large_image",
            "twitter_misc": {
                "Est. reading time": "1 minute"
            },
            "schema": {
                "@context": "https:\/\/schema.org",
                "@graph": [
                    {
                        "@type": "WebPage",
                        "@id": "http:\/\/flower-power.local\/product\/rainy-days-thunderbolt-jacket\/",
                        "url": "http:\/\/flower-power.local\/product\/rainy-days-thunderbolt-jacket\/",
                        "name": "Rainy Days Thunderbolt Jacket - flower power",
                        "isPartOf": {
                            "@id": "http:\/\/flower-power.local\/#website"
                        },
                        "datePublished": "2023-10-12T13:26:35+00:00",
                        "dateModified": "2023-10-13T19:34:20+00:00",
                        "breadcrumb": {
                            "@id": "http:\/\/flower-power.local\/product\/rainy-days-thunderbolt-jacket\/#breadcrumb"
                        },
                        "inLanguage": "en-US",
                        "potentialAction": [
                            {
                                "@type": "ReadAction",
                                "target": [
                                    "http:\/\/flower-power.local\/product\/rainy-days-thunderbolt-jacket\/"
                                ]
                            }
                        ]
                    },
                    {
                        "@type": "BreadcrumbList",
                        "@id": "http:\/\/flower-power.local\/product\/rainy-days-thunderbolt-jacket\/#breadcrumb",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https:\/\/flower-power.local\/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Products",
                                "item": "https:\/\/flower-power.local\/products\/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": "Rainy Days Thunderbolt Jacket"
                            }
                        ]
                    },
                    {
                        "@type": "WebSite",
                        "@id": "http:\/\/flower-power.local\/#website",
                        "url": "http:\/\/flower-power.local\/",
                        "name": "flower power",
                        "description": "",
                        "potentialAction": [
                            {
                                "@type": "SearchAction",
                                "target": {
                                    "@type": "EntryPoint",
                                    "urlTemplate": "http:\/\/flower-power.local\/?s={search_term_string}"
                                },
                                "query-input": "required name=search_term_string"
                            }
                        ],
                        "inLanguage": "en-US"
                    }
                ]
            }
        },
        "_links": {
            "self": [
                {
                    "href": "https:\/\/flower-power.local\/wp-json\/wc\/v3\/products\/16"
                }
            ],
            "collection": [
                {
                    "href": "https:\/\/flower-power.local\/wp-json\/wc\/v3\/products"
                }
            ]
        }
    }
]
*/
