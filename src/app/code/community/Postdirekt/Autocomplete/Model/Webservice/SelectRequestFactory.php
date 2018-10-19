<?php
/**
 * See LICENSE.md for license details.
 */

/**
 * Class Postdirekt_Autocomplete_Model_Webservice_SelectRequestFactory
 *
 * @package   Postdirekt\Autocomplete\Model
 * @author    Christoph Aßmann <christoph.assmann@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Model_Webservice_SelectRequestFactory
{
    /**
     * @var Postdirekt_Autocomplete_Model_Webservice_RequestDataConverter
     */
    protected $_requestDataConverter;

    /**
     * @var Postdirekt_Autocomplete_Model_Webservice_SelectRequestValidator
     */
    protected $_validator;

    /**
     * Postdirekt_Autocomplete_Model_Webservice_SelectRequestFactory constructor.
     */
    public function __construct()
    {
        $this->_requestDataConverter = Mage::getSingleton('postdirekt_autocomplete/webservice_requestDataConverter');
        $this->_validator = Mage::getSingleton('postdirekt_autocomplete/webservice_selectRequestValidator');
    }

    /**
     * @param string[] $data
     * @return Postdirekt_Autocomplete_Model_Webservice_Data_SelectRequest
     * @throws Postdirekt_Autocomplete_Exception_Webservice_ClientException
     */
    public function create(array $data)
    {
        $requestData = $this->_requestDataConverter->convert($data);

        if (isset($data['uuid'])) {
            $requestData['uuid'] = $data['uuid'];
        }

        /** @var Postdirekt_Autocomplete_Model_Webservice_Data_SelectRequest $selectRequest */
        $selectRequest = Mage::getModel('postdirekt_autocomplete/webservice_data_selectRequest', $requestData);
        $selectRequest->validate($this->_validator);

        return $selectRequest;
    }
}
