<?php
/**
 * See LICENSE.md for license details.
 */

/**
 * Class Postdirekt_Autocomplete_Model_Webservice_Exception_ClientException
 *
 * @package   Postdirekt\Autocomplete\Model
 * @author    Rico Sonntag <rico.sonntag@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      https://www.netresearch.de/
 */
class Postdirekt_Autocomplete_Exception_Webservice_ClientException extends \Exception
{
    /**
     * @param string[] $availableFields
     * @return Postdirekt_Autocomplete_Exception_Webservice_ClientException
     */
    public static function parametersMissing(array $availableFields)
    {
        $messageTemplate = 'Please provide at least one of the following search parameters: %s';
        $message = sprintf($messageTemplate, implode(', ', $availableFields));

        return new static($message);
    }

    /**
     * @param string $fieldName
     * @return Postdirekt_Autocomplete_Exception_Webservice_ClientException
     */
    public static function requiredField($fieldName)
    {
        $messageTemplate = "'%s' is a required field.";
        $message = sprintf($messageTemplate, $fieldName);

        return new static($message);
    }

    /**
     * @param int $statusCode
     * @return Postdirekt_Autocomplete_Exception_Webservice_ClientException
     */
    public static function statusException($statusCode)
    {
        switch ($statusCode) {
            case 400:
                $message = '[BAD REQUEST]: Wrong parameters given.';
                break;
            case 401:
                $message = '[UNAUTHORIZED]: Please check your credentials.';
                break;
            case 403:
                $message = '[FORBIDDEN]: You are not authorized to access this resource.';
                break;
            case 405:
                $message = '[BAD METHOD]: Invalid URI called.';
                break;
            default:
                $message = 'The web service returned error ' . $statusCode;
        }

        return new static($message, $statusCode);
    }
}
