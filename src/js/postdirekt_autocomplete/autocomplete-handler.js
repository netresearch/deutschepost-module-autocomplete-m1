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

            var fieldItem = self.addressFields[key];

            if (fieldItem.field.value && fieldItem.field.value.length) {
                self.addressObject[fieldItem.name] = fieldItem.field.value;
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
                        datalistSelect = new DatalistSelect($currentField, self.form, self.addressFields, self.suggestionObject);

                    datalistSelect.updateFields();
                });

            fieldItem.field
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
            searchRequest = new SearchRequest(this.searchUrl);

        searchRequest.doSearchRequest(this.addressObject, function (json) {
            var renderer = new DataListRenderer($field);
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
