<?php
/**
 * See LICENSE.md for license details.
 */

/**
 * Class Postdirekt_Address_AutocompleteController
 *
 * @package   Postdirekt Address
 * @author    Andreas Müller <andreas.mueller@netresearch.de>
 * @copyright 2018 Netresearch GmbH & Co. KG
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link      http://www.netresearch.de/
 */
class Postdirekt_Autocomplete_AutocompleteController extends Mage_Core_Controller_Front_Action
{
    public function searchAction()
    {
        $requestData = $this->getRequest()->getParams();
    }

    public function selectAction()
    {

    }
}
