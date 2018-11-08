<?php
/**
 * See LICENSE.md for license details.
 */

/**
 * Dhl_ExpressRates_Block_Adminhtml_System_Config_Heading
 *
 * @package Dhl\ExpressRates\Block
 * @author  Christoph Aßmann <christoph.assmann@netresearch.de>
 * @license https://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @link    https://www.netresearch.de/
 */
class Dhl_ExpressRates_Block_Adminhtml_System_Config_Heading
    extends Mage_Adminhtml_Block_System_Config_Form_Field
{
    /**
     * Render element html
     *
     * @param Varien_Data_Form_Element_Abstract $element
     * @return string
     */
    public function render(Varien_Data_Form_Element_Abstract $element)
    {
        $comment = $element->getData('comment');
        if ($comment) {
            $comment = "<p>$comment</p>";
        }

        $html = sprintf('<td colspan="5"><h4>%s</h4>%s</td>', $element->getData('label'), $comment);
        return $this->_decorateRowHtml($element, $html);
    }

    /**
     * Decorate field row html
     *
     * @param Varien_Data_Form_Element_Abstract $element
     * @param string $html
     * @return string
     */
    protected function _decorateRowHtml($element, $html)
    {
        return '<tr class="system-fieldset-sub-head" id="row_' . $element->getHtmlId() . '">' . $html . '</tr>';
    }
}
