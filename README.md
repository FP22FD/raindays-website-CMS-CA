# Custom frontend based on Rainydays with WordPress CMS (Content management system) as backend

<!-- A simple overview of use/purpose. -->

WordPress has been used as backend to manage the webshop products, using the wooCommerce plugin.
Dynamic website link:
<https://wordpress-ca.receitasdeferdi.com/>

WordPress frontend static website link:
<https://tubular-jelly-00c49b.netlify.app/>

Assignment:

- [Brief](./docs/cms-CA-brief.pdf)

## Description

<!-- An in-depth paragraph about your project and overview of use. -->

The main purpose of this repository is to configure an API for `RainyDays` website to consume WordPress/wooCommerce Content Management System APIs.
The CA is split in two parts: the `Dynamic host` (WordPress backend) and the `Static host` (custom frontend).

To set up a local testing environment, I installed WordPress on my local machine using `Local` by Flywheel. Then I installed these plugins:

- `WooCommerce`: to create an online store.
- `Yoast SEO`: to optimize for search engines (SEO).
- `WordFence`: to improve the WordPress security, protecting against hackers and malware.
- `Advanced Custom Fields`: to add custom fields.
- `Custom Post Type UI`: to create custom content types.

## Dynamic website

I started by adding 5 fewer products to WooCommerce and created a new Noroff administrator user with a strong password.

To consume the WooCommerce APIs I needed to setup a `wooCommerce API key`, to avoid to setup `CORS` (with a WP plugin).

When the local WordPress project was completed I chose - as suggested - the host `one.com`.

In `one.com` I configured the `sftp` account and the `MySql`/`MariaDb` database name, user name and password. The database host is provided by one.com, visible in the control panel.

Then I migrate the WordPress php files to `one.com` by `sftp` via `FileZilla`. As I did not bought the 1-click solution, I needed to transfer all the files. Otherwise it could have been transferred only the folder `wp-content`.

To export/import the `MySql` database I used the tool phpMyAdmin.

At this point I could change the WordPress configuration file `/wp-conf.php` with the database name, account, and hostname.

As last point I changed the API url used by Javascript, from localhost ([http://flower-power.local](http://flower-power.local)) to the public hosting ([https://wordpress-ca.receitasdeferdi.com](https://wordpress-ca.receitasdeferdi.com/)).

## Static website

I used the WordPress `REST API` (`Re`presentational `S`tate `T`ransfer `A`pplication `P`rogramming `I`nterface) and the headless CMS concept.

In order to avoid having to rely on PHP for all templating needs, I implemented a frontend using custom HTML/CSS & JavaScript to consume WordPress/wooCommerce data (static host).

Then to access and consume the APIs I used WooCommerce with authentication.

Via JavaScript I called an API to fetch all products and also to fetch a specific product by ID.

After that, I committed my frontend code to GitHub.

Lastly, I deployed the website on Netlify, to publish the `static host`.

## Outcome

Overall, I found this project challenging but very useful, especially when improving the website.
I learned to implement developing a local test environment, setup essential plugins to website, to use the WordPress panel, to implement a child theme, to use WordPress as headless.

## Dependencies

<!-- - Describe any prerequisites, libraries, OS version, etc., needed before installing the program.
- ex. Windows 10 -->

To develop the website I have used `Visual Studio Code` with `Prettier` formatter extension.

No other tools are required to compile or run the website.

### References
