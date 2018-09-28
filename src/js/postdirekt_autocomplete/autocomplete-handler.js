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
    addressItemDivider: ', ',

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
        this.form                   = $(formId);
        this.searchUrl              = searchUrl;
        this.respondUrl             = respondUrl;
        this.addressFieldNames      = watchedFieldIds;
        this.addressFields          = this.getAutocompleteFields();
        this.searchRequest          = new SearchRequest(this.searchUrl);
        this.selectRequest          = new SelectRequest(this.respondUrl);
        this.addressSuggestions     = new AutocompleteAddressSuggestions({});
        this.addressData            = new AutocompleteAddressData({});
        this.fieldInputAction       = new FieldInput(this.addressFields, this.addressData, this.searchRequest);
        this.datalistRenderer       = new DataListRenderer(this.addressFieldNames, this.addressSuggestions, this.addressItemDivider);
        this.datalistSelectAction   = new DatalistSelect(this.form, this.addressFields, this.addressSuggestions);

        this.loadPrefilledValues();
        this.listenFields();
    },

    /**
     * Gets all form fields with name and field element
     *
     * @returns {Object}
     */
    getAutocompleteFields: function () {
        var fields = {};

        for (var key in this.addressFieldNames) {
            var item   = this.addressFieldNames[key];
            var $field = this.form.select('#' + item)[0];

            if ($field) {
                fields[$field.id] = {
                    name: key,
                    field: $field
                };
            }
        }

        return fields;
    },

    /**
     * Writes existing field values into object
     *
     * @returns void
     */
    loadPrefilledValues: function () {
        for (var key in this.addressFields) {
            var fieldItem = this.addressFields[key];

            if (fieldItem.field.value && fieldItem.field.value.length) {
                this.addressData.setValue(fieldItem.name, fieldItem.field.value);
            }
        }
    },

    /**
     * Adds listener to observed address fields
     *
     * @returns void
     */
    listenFields: function () {
        var self = this;

        for (var key in self.addressFields) {
            var fieldItem = self.addressFields[key];

            // Set field name as data attribute
            fieldItem.field.setAttribute('data-address-item', key);

            // Watch input value changes
            fieldItem.field
                .observe('input', function (e) {
                    // Update address object
                    self.fieldInputAction.doInputAction(e.target);
                    // Run address search with timeout
                    self.triggerDelayedCallback(function () {
                        self.searchAction(e.target);
                    });
                    // Run actions after datalist changes
                    self.triggerDataListChangeEvent(e.target);
                });

            // Watch suggestion selection
            fieldItem.field
                .observe('autocomplete:datalist-select', function (e) {
                    // Update all observed fields after item was selected in datalist
                    self.datalistSelectAction.updateFields(e.target);
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
        delay = delay || this.typingDelay;

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
     * @param {HTMLElement} $field
     *
     * @return {Object} Search results
     */
    searchAction: function ($field) {
        var self = this;

        this.searchRequest.doSearchRequest(this.addressData.getData(), function (json) {
            self.addressSuggestions.setAddressSuggestions(json);
            self.datalistRenderer.render($field);
        });
    },

    /**
     * Executes a select request.
     *
     * @return {Object} Select results
     */
    selectAction: function () {
        if (!this.addressData.getData().uuid) {
            throw 'Missing required field <uuid>';
        }

        this.selectRequest.doSelectRequest(this.addressData.getData(), function (json) {
console.log(json);
        });
    }
};
