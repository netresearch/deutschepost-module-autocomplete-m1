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

            // Watch key strokes
            fieldItem
                .observe('keyup', function (e) {
                    // Update address object
                    self.fieldInputAction.doInputAction(e.target);
                    // Run address search with timeout
                    self.triggerDelayedCallback(function () {
                        self.searchAction(e.target);
                    });
                });

            // Watch input value changes
            fieldItem
                .observe('input', function (e) {
                     // Run actions after datalist changes
                    self.datalistSelectAction.receiveSelectEvent(e.target);
                });

            // Watch suggestion selection
            fieldItem
                .observe('autocomplete:datalist-select', function (e) {
                    // Remove focus after selection, preventing chrome from re-showing the datalist again
                    e.target.blur();

                    // Update all observed fields after item was selected in datalist
                    self.datalistSelectAction.updateFields(e.target);
                    self.selectAction();
                });
        });
    },

    /**
     * Triggers an delayed callback.
     *
     * @param {Function} callback Callback to execute after timeout
     * @param {int}      delay    Delay in milliseconds
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
    searchAction: function ($currentField) {
        var self = this;

        this.searchRequest.doSearchRequest(this.addressData.getData(), function (json) {
            self.addressSuggestions.setAddressSuggestions(json);
            self.datalistRenderer.render($currentField);
        });
    },

    /**
     * Executes a select request.
     *
     * @return {Object} Select results
     */
    selectAction: function () {
        var selectedSuggestion = this.datalistSelectAction.getCurrentSuggestion();

        if (!selectedSuggestion || !selectedSuggestion.uuid) {
            throw 'Missing required field <uuid>';
        }

        this.selectRequest.doSelectRequest(this.addressData.getData());

        // this.selectRequest.doSelectRequest(selectedSuggestion);
    }
};
