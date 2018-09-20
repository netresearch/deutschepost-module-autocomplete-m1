<?php
/**
 * See LICENSE.md for license details.
 */

use \Postdirekt_Autocomplete_Model_Webservice_SelectRequestValidator as Validator;

/**
 * Class Postdirekt_Autocomplete_Model_Webservice_Data_SelectRequest
 *
 * @package   Postdirekt\Autocomplete\Model
 * @author    Christoph Aßmann <christoph.assmann@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Model_Webservice_Data_SelectRequest extends Varien_Object
{
    /**
     * @var string[]
     */
    protected $_fields = array(
        'uuid',
        'daten',
        'plz',
        'ort',
        'str',
    );

    /**
     * Check if request data are valid for sending to the web service.
     *
     * @param Validator $validator
     * @return bool
     * @throws Postdirekt_Autocomplete_Exception_Webservice_ClientException
     */
    public function validate(Validator $validator)
    {
        $result = $validator->validate($this->_fields, $this->getData());
        return $result;
    }

    /**
     * Return subset of data: non-empty fields which are available at the api.
     *
     * @return string[]
     */
    public function getRequestParams()
    {
        $requestParams = $this->toArray($this->_fields);
        $requestParams = array_filter($requestParams);

        return $requestParams;
    }
}