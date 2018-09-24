"use strict";

var AddressAutocomplete = Class.create();

/**
 * Resource model for full AddressAutocomplete objects
 *
 * @type {{}}
 */
AddressAutocomplete.prototype = {
    typingDelay: 300,
    timeoutId: null,

    /**
     * @property suggestionObject
     */
    suggestionObject: {},

    /**
     * @property addressObject
     */
    addressObject: {
        // init: false,
        // returnId: false,
        // returnAddressObject: false
    },

    /**
     * @property form
     */
    form: null,

    /**
     *
     * @param {string} apiUrl
     * @param {array}  watchedFieldIds
     *
     * @constructor
     */
    initialize: function (apiUrl, watchedFieldIds) {
        var self              = this,
            addressFieldNames = watchedFieldIds,
            addressFields     = self.getSearchFields(addressFieldNames);

        self.loadPrefilledValues(addressFields);
        self.listenFields(addressFields);
    },

    /**
     *
     * @param {array} fieldNames
     *
     * @returns {object}
     */
    getSearchFields: function (fieldNames) {
        var $fields = {};

        for (var key in fieldNames) {
            var item   = fieldNames[key];
            var $field = $$('#' + item)[0];

            if ($field) {
                $fields[$field.id] = {
                    name: key,
                    field: $field
                };
            }
        };

        return $fields;
    },

    /**
     * Writes existing field values into object
     *
     * @param {array} addressFieldNames
     * @param {object} addressFields
     *
     * @returns void
     */
    loadPrefilledValues: function (addressFieldNames, addressFields) {
        var self = this;

        for (var key in addressFields) {
            var obj = addressFields[key];

            if (obj.field.value && obj.field.value.length) {
                self.addressObject[obj.name] = obj.field.value;
            }
        };
    },

    /**
     * Adds listener to selected fields
     *
     * @param {object} addressFields
     *
     * @returns void
     */
    listenFields: function (addressFields) {
        var self = this;

        for (var key in addressFields) {
            var obj = addressFields[key];

            obj.field.setAttribute('data-address-item', item);

            obj.field
                .observe('autocomplete:datalist-select', function (event) {
                    var value  = event.target.value,
                        option = event.target.next('datalist').down("[value='" + value + "']");

                    if (option) {
                        var currentSuggestionObject = self.suggestionObject.filter(function (item) {
                            return item.uuid === option.id;
                        });

                        // fill all fields with response values
                        addressFieldNames.each(function (item) {
                            // get data selector with address item
                            var selector = '[data-address-item="' + item + '"]',
                                addressFieldById = self.form.select(selector);

                            if (addressFieldById && currentSuggestionObject[0][item]) {
                                addressFieldById[0].value = currentSuggestionObject[0][item];
                            }
                        });
                    }
                });

            obj.field
                .observe('input', function (event) {
                    var $field = this;
                    var item   = addressFields[event.target.id];

                    self.triggerDataListChangeEvent(event);

                    self.addressObject[item.name] = event.target.value;

console.log('Current value: ', event.target.value, 'addressObject: ', self.addressObject);

                    self.triggerDelayedCallback(function () {
                        self.searchAction($field);
                    });
                });
        }
    },

    /**
     * Trigger an custom event "autocomplete:datalist-select" on datalist selection.
     *
     * @param event
     */
    triggerDataListChangeEvent: function (event) {
        var input       = event.target,
            listId      = input.getAttribute('list'),
            dataList    = $(listId),
            dataOptions = null;

        if (dataList) {
            dataOptions = dataList.childNodes;

            for (var i = 0; i < dataOptions.length; ++i) {
                if (dataOptions[i].value === input.value) {
                    Event.fire($(input), 'autocomplete:datalist-select');
                    break;
                }
            }
        }
    },

    /**
     * Triggers an delayed callback.
     *
     * @param {Function} callback Callback to execute after timeout
     * @param {int} delay Delay in milliseconds
     */
    triggerDelayedCallback: function (callback, delay) {
        var self = this;

        delay = delay || self.typingDelay;

        // Clear timeout to prevent previous task from execution
        if (typeof this.timeoutId === 'number') {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = window.setTimeout(
            callback,
            delay
        );
    },

    /**
     * Executes a search request.
     *
     * @return {Object} Search results
     */
    searchAction: function ($field) {
        var self          = this,
            searchRequest = new SearchRequest(apiUrl),
            renderer      = new DataListRenderer($field);

        searchRequest.doSearchRequest(this.addressObject, function (json) {
            renderer.render(json);

            self.suggestionObject = json;
        });
    },

    /**
     * Executes a select request.
     *
     * @return {Object} Select results
     */
    selectAction: function ($field) {
        var self          = this,
            selectRequest = new SelectRequest(apiUrl);

        if (!this.addressObject.uuid) {
            throw 'Missing required field <uuid>';
        }

        selectRequest.doSelectRequest(this.addressObject, function (json) {
console.log(json);
        });
    }
};
