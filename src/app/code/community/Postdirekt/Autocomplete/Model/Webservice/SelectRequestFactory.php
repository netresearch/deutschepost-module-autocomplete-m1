<?php
/**
 * See LICENSE.md for license details.
 */

use Postdirekt_Autocomplete_Model_Webservice_AbstractRequestFactory as AbstractRequestFactory;

/**
 * Class Postdirekt_Autocomplete_Model_Webservice_SelectRequestFactory
 *
 * @package   Postdirekt\Autocomplete\Model
 * @author    Christoph Aßmann <christoph.assmann@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Model_Webservice_SelectRequestFactory extends AbstractRequestFactory
{
    /**
     * @param string[] $data
     * @return Postdirekt_Autocomplete_Model_Webservice_Data_SelectRequest
     * @throws Postdirekt_Autocomplete_Exception_Webservice_ClientException
     */
    public function create(array $data)
    {
        $requestData = array();

        if (isset($data['street'])) {
            $requestData['str'] = is_array($data['street']) ? $data['street'][0] : $data['street'];
        }

        if (isset($data['postcode'])) {
            $requestData['plz'] = $data['postcode'];
        }

        if (isset($data['city'])) {
            $requestData['ort'] = $data['city'];
        }

        if (isset($data['uuid'])) {
            $requestData['uuid'] = $data['uuid'];
        }

        $requestData['daten'] = $this->computeDataType($data);
        $requestData['type'] = $this->computeType($data);

        /** @var Postdirekt_Autocomplete_Model_Webservice_SelectRequestValidator $validator */
        $validator = Mage::getSingleton('postdirekt_autocomplete/webservice_selectRequestValidator');

        /** @var Postdirekt_Autocomplete_Model_Webservice_Data_SelectRequest $selectRequest */
        $selectRequest = Mage::getModel('postdirekt_autocomplete/webservice_data_selectRequest', $requestData);
        $selectRequest->validate($validator);

        return $selectRequest;
    }
}
