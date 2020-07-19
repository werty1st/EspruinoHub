/*
 * This file is part of EspruinoHub, a Bluetooth-MQTT bridge for
 * Puck.js/Espruino JavaScript Microcontrollers
 *
 * Copyright (C) 2016 Gordon Williams <gw@pur3.co.uk>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * ----------------------------------------------------------------------------
 *  Configuration file handling
 * ----------------------------------------------------------------------------
 */

var CONFIG_FILENAME = "config.json";

/** If the device is listed here, we use the human readable name
when printing status and publishing on MQTT */
exports.known_devices = {};

/** List of device addresses that are allowed to access the HTTP proxy */
exports.http_whitelist = [];

/** list of services that can be decoded */
exports.advertised_services = {};

/** switch indicating whether discovery should only accept known devices */
exports.only_known_devices = false;

/* How many seconds to wait for a packet before considering BLE connection
broken and exiting. Higher values are useful with slowly advertising sensors.
Setting a value of 0 disables the exit/restart. */
exports.ble_timeout = 10;

/* MQTT base path for history requests and output */
exports.history_path = "/hist/";

/* time periods used for history */
exports.history_times = {
  minute : 60*1000,
  tenminutes : 10*60*1000,
  hour : 60*60*1000,
  day : 24*60*60*1000
};

/* Mqtt topic prefix. For legacy purposes this is configured with a leading
slash. Please note that this is not adviced as it adds an unnecesary level.
For new installation, please remove the slash from the configuration. */
exports.mqtt_prefix = "/ble";

function log(x) {
  console.log("<Config> "+x);
}


/// Load configuration
exports.init = function() {
  var fs = require("fs");
  if (fs.existsSync(CONFIG_FILENAME)) {
    var f = fs.readFileSync(CONFIG_FILENAME).toString();
    var json = {};
    try {
      json = JSON.parse(f);
    } catch (e) {
      log("Error parsing "+CONFIG_FILENAME+": "+e);
      return;
    }
    // Load settings
    if (json.known_devices) {
      Object.keys(json.known_devices).forEach(function (k) {
        exports.known_devices[k.toString().toLowerCase()] = json.known_devices[k];
      });
    }
    if (json.only_known_devices)
      exports.only_known_devices = json.only_known_devices;
    if (json.ble_timeout)
      exports.ble_timeout = json.ble_timeout;
    if (json.history_path)
      exports.history_path = json.history_path;
    exports.mqtt_host = json.mqtt_host ? json.mqtt_host : 'mqtt://localhost';
    exports.mqtt_options = json.mqtt_options ? json.mqtt_options : {};
    if (json.mqtt_prefix)
      exports.mqtt_prefix = json.mqtt_prefix;
    if (json.http_whitelist)
      exports.http_whitelist = json.http_whitelist;
    if (json.advertised_services)
      exports.advertised_services = json.advertised_services;
    if (json.http_proxy)
      exports.http_proxy = true;
      if (parseInt(json.http_port))
        exports.http_port = parseInt(json.http_port);
    log("Config loaded");
  } else {
    log("No "+CONFIG_FILENAME+" found");
  }
};

exports.deviceToAddr = function(id) {
  var addr = id.toLowerCase();
  Object.keys(exports.known_devices).forEach(function(k) {
    if (exports.known_devices[k] == id)
      addr = k;
  });
  return addr;
}
