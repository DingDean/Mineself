# Mineself

[![Build Status](https://travis-ci.com/DingDean/Mineself.svg?branch=master)](https://travis-ci.com/DingDean/Mineself)

Mineself is an attempt to record, analyze and visualize a user's own digital footprint as much as possible.

It uses a set of applications to collect and visualize data:

* [mineself-client](https://github.com/DingDean/mineself-client)
  - An application to collect code editing informations
  - It integrates with the following editor plugins:
    * [vim-digitme](https://github.com/DingDean/vim-digitme)
* [pwa-digitalme](https://github.com/DingDean/pwa-digitalme)
  - The front end pwa application to visualize the collected data
* [search-digitalme](https://github.com/DingDean/search-digitalme)
  - A Chrome extension to capture and send search queries back to a designated server

It collects your coding informations like filetype, coding speed, coding 
patterns. 

It can answer your questions like the followings:

- How often do you code?
- How fast do you code?
- When do you code often?
- What languages do you usually deal with?

Data collected would be processed and visualized properly through a web
 interface.

# TODO

- [ ] Track geographic info
- [ ] SQL
- [ ] GraphQL
