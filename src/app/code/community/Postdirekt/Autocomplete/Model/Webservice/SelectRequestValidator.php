<?php
/**
 * See LICENSE.md for license details.
 */

use Postdirekt_Autocomplete_Exception_Webservice_ClientException as ClientException;

/**
 * Class Postdirekt_Autocomplete_Model_Webservice_SelectRequestValidator
 *
 * @package   Postdirekt\Autocomplete\Model
 * @author    Christoph Aßmann <christoph.assmann@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Model_Webservice_SelectRequestValidator
{
    /**
     * @param array $fieldNames
     * @param array $data
     * @return bool
     * @throws Postdirekt_Autocomplete_Exception_Webservice_ClientException
     */
    public function validate(array $fieldNames, array $data)
    {
        if (empty($data['uuid'])) {
            throw ClientException::requiredField('uuid');
        }

        $keys = array_keys($data);
        $keys = array_intersect($fieldNames, $keys);
        if (empty($keys)) {
            throw ClientException::parametersMissing($fieldNames);
        }

        return true;
    }
}
