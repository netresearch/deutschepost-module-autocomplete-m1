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
        this.addressFieldNames  = watchedFieldIds;
        this.searchUrl          = searchUrl;
        this.respondUrl         = respondUrl;
        this.addressFields      = this.getSearchFields();
        this.searchRequest      = new SearchRequest(this.searchUrl);
        this.addressSuggestions = new AutocompleteAddressSuggestions({});
        this.addressData        = new AutocompleteAddressData({});
        this.fieldInputAction   = new FieldInput(this.addressFields, this.addressData, this.searchRequest);

        this.loadPrefilledValues();
        this.listenFields();
    },

    /**
     *
     * @returns {Object}
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

            var fieldItem = self.addressFields[key];

            if (fieldItem.field.value && fieldItem.field.value.length) {
                self.addressData.setValue(fieldItem.name, fieldItem.field.value);
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
            var fieldItem = self.addressFields[key];

            fieldItem.field.setAttribute('data-address-item', key);

            fieldItem.field
                .observe('autocomplete:datalist-select', function (event) {
                    var $currentField = event.target,
                        datalistSelect = new DatalistSelect($currentField, self.form, self.addressFields, self.addressSuggestions.getAddressSuggestions());

                    datalistSelect.updateFields();
                });

            fieldItem.field
                .observe('input', function () {
                    var $currentField = this;

                    self.triggerDataListChangeEvent($currentField);
                    self.fieldInputAction.doInputAction($currentField);

console.log('Current value: ', event.target.value, 'addressObject: ', self.addressData);

                    self.triggerDelayedCallback(function () {
                        self.searchAction($currentField);
                    });

                });
        }
    },

    /**
     * Trigger an custom event "autocomplete:datalist-select" on datalist selection.
     *
     * @param {HTMLElement} $field
     */
    triggerDataListChangeEvent: function ($field) {
        var listId      = $field.getAttribute('list'),
            dataList    = $(listId),
            dataOptions = null;

        if (dataList) {
            dataOptions = dataList.childNodes;

            for (var i = 0; i < dataOptions.length; ++i) {
                if (dataOptions[i].value === $field.value) {
                    Event.fire($($field), 'autocomplete:datalist-select');
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
        var self = this;

        this.searchRequest.doSearchRequest(this.addressData.getData(), function (json) {
            var renderer = new DataListRenderer($field);
            renderer.render(json, self.addressFieldNames, ', ');
            self.addressSuggestions.setAddressSuggestions(json);
        });
    },

    /**
     * Executes a select request.
     *
     * @return {Object} Select results
     */
    selectAction: function () {
        var selectRequest = new SelectRequest(this.respondUrl);

        if (!this.addressData.getAddressData().uuid) {
            throw 'Missing required field <uuid>';
        }

        selectRequest.doSelectRequest(this.addressData.getAddressData(), function (json) {
console.log(json);
        });
    }
};
