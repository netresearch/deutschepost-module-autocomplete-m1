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
        this.addressFields          = new AutocompleteFields(this.form, this.addressFieldNames);
        this.searchRequest          = new SearchRequest(this.searchUrl);
        this.selectRequest          = new SelectRequest(this.respondUrl);
        this.addressSuggestions     = new AutocompleteAddressSuggestions({});
        this.addressData            = new AutocompleteAddressData({});
        this.fieldInputAction       = new FieldInput(this.addressFields, this.addressData, this.searchRequest);
        this.datalistRenderer       = new DataListRenderer(this.addressFields, this.addressSuggestions, this.addressItemDivider);
        this.datalistSelectAction   = new DatalistSelect(this.form, this.addressFields, this.addressSuggestions);

        this.loadPrefilledValues();
        this.listenFields();
    },

    /**
     * Writes existing field values into object
     *
     * @returns void
     */
    loadPrefilledValues: function () {
        this.addressFields.getFields().each(function(field) {
            if (field.value && field.length) {
                this.addressData.setDataValue(field.name, field.value);
            }
        });
    },

    /**
     * Adds listener to observed address fields
     *
     * @returns void
     */
    listenFields: function () {
        var self = this;

        this.addressFields.getIds().each(function(fieldId) {
            var fieldItem = self.addressFields.getFieldById(fieldId);

            // Set field name as data attribute to prevent problems with colon selectors
            fieldItem.setAttribute('data-address-item', fieldId);

            // Watch input value changes
            fieldItem
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
            fieldItem
                .observe('autocomplete:datalist-select', function (e) {
                    // Update all observed fields after item was selected in datalist
                    self.datalistSelectAction.updateFields(e.target);
                });
        });
    },

    /**
     * Triggers a custom event "autocomplete:datalist-select" on datalist selection.
     *
     * @param {HTMLElement} $field
     */
    triggerDataListChangeEvent: function ($field) {
        var listId      = $field.getAttribute('list'),
            dataList    = $(listId),
            dataOptions = null;

        if (dataList) {
            dataOptions = dataList.childNodes;
            // Find option that matches the field value and fire the event for this item
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
console.log('ToDo: add callback for Data:', json);
        });
    }
};
