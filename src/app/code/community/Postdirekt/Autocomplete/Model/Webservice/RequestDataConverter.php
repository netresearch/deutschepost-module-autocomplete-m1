<?php
/**
 * See LICENSE.md for license details.
 */

/**
 * Class Postdirekt_Autocomplete_Model_Webservice_RequestDataConverter
 *
 * @package   Postdirekt\Autocomplete\Model
 * @author    Christoph Aßmann <christoph.assmann@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Model_Webservice_RequestDataConverter
{
    const TYPE_REGULAR_ADDRESSES = 'A';
    const TYPE_POSTAL_OFFICES = 'F';
    const TYPE_PARCEL_STATIONS = 'P';

    const DATA_CITY = 'Ort';
    const DATA_POSTAL_CODE_CITY = 'PlzOrt';
    const DATA_ALL = 'PlzOrtStr';

    /**
     * Convert client request params into data suitable for webservice request.
     *
     * @param string[] $data Request params sent from client to module
     * @return string[] Request params to be sent from module to webservice
     */
    public function convert(array $data)
    {
        $requestData = array(
            'type'  => self::TYPE_REGULAR_ADDRESSES,
            'daten' => self::DATA_ALL,
        );

        if (isset($data['street'])) {
            $requestData['kombination'] = is_array($data['street']) ? $data['street'][0] : $data['street'];
        }

        if (isset($data['postcode'])) {
            $requestData['plz'] = $data['postcode'];
        }

        if (isset($data['city'])) {
            $requestData['ort'] = $data['city'];
        }

        // Consolidate parameters
        if (!isset($data['street'])) {
            if (!isset($data['postcode'])) {
                // City only
                $requestData['daten'] = self::DATA_CITY;
            } else {
                $requestData['daten'] = self::DATA_POSTAL_CODE_CITY;
            }

            // No street given, remove the "type" as this results in an empty
            // response if the "daten" parameter will not be "PlzOrtStr"
            unset($requestData['type']);
        }

        return $requestData;
    }
}
