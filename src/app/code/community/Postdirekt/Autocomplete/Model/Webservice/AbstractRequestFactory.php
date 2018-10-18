<?php
/**
 * See LICENSE.md for license details.
 */

/**
 * Class Postdirekt_Autocomplete_Model_Webservice_AbstractRequestFactory
 *
 * @package   Postdirekt\Autocomplete\Model
 * @author    Max Melzer <max.melzer@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
abstract class Postdirekt_Autocomplete_Model_Webservice_AbstractRequestFactory
{
    const TYPE_REGULAR_ADDRESSES = 'A';

    const TYPE_DATA_CITY = 'Ort';
    const TYPE_DATA_POSTAL_CODE_CITY = 'PlzOrt';
    const TYPE_DATA_ALL = 'PlzOrtStr';

    /**
     * @param string[] $data
     * @return false|Postdirekt_Autocomplete_Model_Webservice_Data_SearchRequest
     * @throws Postdirekt_Autocomplete_Exception_Webservice_ClientException
     */
    abstract public function create(array $data);

    /**
     * @param string[] $data
     * @return string
     */
    protected function computeDataType($data)
    {
        if (isset($data['postcode'])) {
            if (isset($data['street'])) {
                return self::TYPE_DATA_ALL;
            }

            return self::TYPE_DATA_POSTAL_CODE_CITY;
        }

        return self::TYPE_DATA_CITY;
    }

    /**
     * @param string[] $data
     * @return string|null
     */
    protected function computeType($data)
    {
        if (isset($data['street'])) {
            return self::TYPE_REGULAR_ADDRESSES;
        }

        return null;
    }
}
