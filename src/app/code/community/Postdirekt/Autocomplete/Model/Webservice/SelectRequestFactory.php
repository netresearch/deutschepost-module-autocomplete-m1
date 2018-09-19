<?php
/**
 * See LICENSE.md for license details.
 */

/**
 * Class Postdirekt_Autocomplete_Model_Webservice_SelectRequestFactory
 *
 * @package   Postdirekt\Autocomplete\Model
 * @author    Rico Sonntag <rico.sonntag@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Model_Webservice_SelectRequestFactory
{
    /**
     * @param string[] $data
     * @return false|Postdirekt_Autocomplete_Model_Webservice_Data_SearchRequest
     * @throws Postdirekt_Autocomplete_Exception_Webservice_ClientException
     */
    public function create(array $data)
    {
        $requestData = array();
        if (isset($data['uuid'])) {
            $requestData['uuid'] = $data['uuid'];
        }

        if (isset($data['street'])) {
            $requestData['str'] = is_array($data['street']) ? $data['street'][0] : $data['street'];
        }

        if (isset($data['postcode'])) {
            $requestData['plz'] = $data['postcode'];
        }

        if (isset($data['city'])) {
            $requestData['ort'] = $data['city'];
        }

        /** @var Postdirekt_Autocomplete_Model_Webservice_SelectRequestValidator $validator */
        $validator = Mage::getSingleton('postdirekt_autocomplete/webservice_selectRequestValidator');

        $searchRequest = Mage::getModel('postdirekt_autocomplete/webservice_data_selectRequest', $requestData);
        $searchRequest->validate($validator);

        return $searchRequest;
    }
}
