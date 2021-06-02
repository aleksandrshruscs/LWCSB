import { LightningElement,wire,track } from 'lwc';
import getBoatTypes from "@salesforce/apex/BoatDataService.getBoatTypes";
export default class BoatSearchForm extends LightningElement {
    selectedBoatTypeId = '';
    value='';
    // Private
  	error = undefined;
   
    // Needs explicit track due to nested data
    @track searchOptions;
    label;
    
    // Wire a custom Apex method
    @wire(getBoatTypes)
      boatTypes({ error, data }) {
      if (data) {
          this.searchOptions = data.map(type => {
            return {
                label:type.Name,
                value:type.Id
            }     
        });      
        this.searchOptions.unshift({ label: 'All Types', value: '' });
      } else if (error) {
        this.searchOptions = undefined;
        this.error = error;
      }
    }
    
    // Fires event that the search option has changed.
	handleSearchOptionChange(event) {
        this.selectedBoatTypeId = event.detail.value;
        const searchEvent = new CustomEvent('search', {
            detail: {
              boatTypeId : this.selectedBoatTypeId
            }
        });
      searchEvent;
      this.dispatchEvent(searchEvent);
    }
}