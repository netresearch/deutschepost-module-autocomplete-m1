"use strict";

var AddressAutocomplete = Class.create();

/**
 * Resource model for full AddressAutocomplete objects
 *
 * @type {{}}
 */
AddressAutocomplete.prototype = {
    typingDelay: 100,
    timeoutId: null,

    /**
     * @property suggestionObject
     */
    suggestionObject: {},

    /**
     * @property addressObject
     */
    addressObject: {},

    /**
     *
     * @param {string} formId
     * @param {string} searchUrl
     * @param {string} respondUrl
     * @param {array}  watchedFieldIds
     *
     * @constructor
     */
    initialize: function (formId, searchUrl, respondUrl, watchedFieldIds) {
        this.form               = $(formId);
        this.searchUrl          = searchUrl;
        this.respondUrl         = respondUrl;
        this.addressFieldNames  = watchedFieldIds;
        this.addressFields      = this.getSearchFields();

        this.loadPrefilledValues();
        this.listenFields();
    },

    /**
     *
     * @returns {object}
     */
    getSearchFields: function () {
        var $fields = {};

        for (var key in this.addressFieldNames) {
            var item   = this.addressFieldNames[key];
            var $field = this.form.select('#' + item)[0];

            if ($field) {
                $fields[$field.id] = {
                    name: key,
                    field: $field
                };
            }
        }

        return $fields;
    },

    /**
     * Writes existing field values into object
     *
     * @returns void
     */
    loadPrefilledValues: function () {
        var self = this;

        for (var key in self.addressFields) {
            var obj = self.addressFields[key];

            if (obj.field.value && obj.field.value.length) {
                self.addressObject[obj.name] = obj.field.value;
            }
        }
    },

    /**
     * Adds listener to selected fields
     *
     * @returns void
     */
    listenFields: function () {
        var self = this;

        for (var key in self.addressFields) {
            var obj = self.addressFields[key];

            obj.field.setAttribute('data-address-item', key);

            obj.field
                .observe('autocomplete:datalist-select', function (event) {
                    var value  = event.target.value,
                        option = event.target.next('datalist').down("[value='" + value + "']");

                    if (option) {
                        var currentSuggestionObject = self.suggestionObject.filter(function (item) {
                            return item.uuid === option.id;
                        });

                        // Fill all fields with response values
                        for (var field in self.addressFields) {
                            // Get data selector with address item
                            var selector         = '[data-address-item="' + field + '"]',
                                addressFieldById = self.form.select(selector),
                                item             = self.addressFields[field].name;

                            if (addressFieldById && currentSuggestionObject[0][item]) {
                                addressFieldById[0].value = currentSuggestionObject[0][item];
                            }
                        }
                    }
                });

            obj.field
                .observe('input', function (event) {
                    var $field = this;
                    var item   = self.addressFields[event.target.id];

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
            clearTimeout(self.timeoutId);
        }

        this.timeoutId = window.setTimeout(
            callback,
            delay
        );
    },

    /**
     * Executes a search request.
     *
     * @param {HTMLElement} $field
     *
     * @return {Object} Search results
     */
    searchAction: function ($field) {
        var self          = this,
            searchRequest = new SearchRequest(this.searchUrl),
            renderer      = new DataListRenderer($field);

        searchRequest.doSearchRequest(this.addressObject, function (json) {
            renderer.render(json, self.addressFieldNames, ', ');

            self.suggestionObject = json;
        });
    },

    /**
     * Executes a select request.
     *
     * @return {Object} Select results
     */
    selectAction: function () {
        var selectRequest = new SelectRequest(this.respondUrl);

        if (!this.addressObject.uuid) {
            throw 'Missing required field <uuid>';
        }

        selectRequest.doSelectRequest(this.addressObject, function (json) {
console.log(json);
        });
    }
};
