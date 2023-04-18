import { LightningElement, wire,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import { createRecord } from 'lightning/uiRecordApi';
import insertRecord from '@salesforce/apex/DemoInsertionClass.insertResourceRecord'; //apex class for insertion resource records
import insertResourceDetailRecord from '@salesforce/apex/DemoInsertionClass.insertResourceDetailRecord'; 
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import RESOURCE_OBJECT from '@salesforce/schema/Resource__c';
import RESOURCE_DETAIL_OBJECT from '@salesforce/schema/Resource_Detail__c';

//fields
import TOTAL_IT_EXP from '@salesforce/schema/Resource__c.Total_IT_Experience__c'; //no need
import REV_EXP from '@salesforce/schema/Resource__c.Relavent_Experience__c'; //no need
//picklist fields in Resource object
import AVAILABILITY_STATUS from '@salesforce/schema/Resource__c.Availability_status__c'; //done
import HIGHEST_EDUCATION from '@salesforce/schema/Resource__c.Highest_Education__c'; //done
import LOCATIONS from '@salesforce/schema/Resource__c.Location__c'; //done
import LOOKING_FOR from '@salesforce/schema/Resource__c.Looking_for__c'; //done
import AVAILABILITY_IN from '@salesforce/schema/Resource__c.Availability_in__c'; //done
import SKILL_SET from '@salesforce/schema/Resource__c.Relavent_skill_set__c'; //at last

import RD_AVAILABILITY_IN from '@salesforce/schema/Resource_Detail__c.Availability_in__c';
import RD_LOCATION from '@salesforce/schema/Resource_Detail__c.Location__c';
import RD_WORKED_SKILL_SET from '@salesforce/schema/Resource_Detail__c.Worked_skill_set__c';


export default class ResourceLwcComp extends LightningElement {
    resourceId; // property of resourceId after insertion
    @track showFields = false; //for drop down button of fields

    @track getResourceRecord = {
        Total_IT_Experience__c : '',
        Relavent_Experience__c: '',
        Availability_status__c: '',
        Highest_Education__c: '',
        Location__c: '',
        Looking_for__c: '',
        Availability_in__c: '',
        Relavent_skill_set__c: ''
    };

    @track getResourceDetailRecord = {
        Availability_in__c : '',
        End_date__c: '',
        Location__c: '',
        Project__c: '',
        Name: '',
        Served_company__c: '',
        Start_date__c: '',
        Worked_skill_set__c: ''
    }
    
    //for Resource Object Wire and common for all
    @wire(getObjectInfo, {objectApiName: RESOURCE_OBJECT})
    resObj;

    //for resource detail object
    @wire(getObjectInfo,{objectApiName: RESOURCE_DETAIL_OBJECT})
    resDetailObj;

                    /*GETTING PICKLIST VALUES  OF RESOURCE OBJECT*/
    @wire(getPicklistValues,{recordTypeId: '$resObj.data.defaultRecordTypeId',fieldApiName: AVAILABILITY_IN})
    resAvaiInValues; //Availability in wire to get values

    @wire(getPicklistValues,{recordTypeId: '$resObj.data.defaultRecordTypeId',fieldApiName: AVAILABILITY_STATUS})
    resAvailabilityStatusValues; //Availability status wire to get values

    @wire(getPicklistValues,{recordTypeId: '$resObj.data.defaultRecordTypeId',fieldApiName: HIGHEST_EDUCATION})
    resHighestEducationValues; //Highest Education wire to get values

    @wire(getPicklistValues,{recordTypeId: '$resObj.data.defaultRecordTypeId',fieldApiName: LOCATIONS})
    resLocationValues; //Location wire to get values

    @wire(getPicklistValues,{recordTypeId: '$resObj.data.defaultRecordTypeId',fieldApiName: LOOKING_FOR})
    resLookingForValues; //Looking for wire to get values

    @wire(getPicklistValues,{recordTypeId: '$resObj.data.defaultRecordTypeId',fieldApiName: SKILL_SET})
    resSkillSetValues; //Skill set wire to get values

                    /*GETTING PICKLIST VALUES  OF RESOURCE DETAIL OBJECT*/
    @wire(getPicklistValues,{recordTypeId: '$resDetailObj.data.defaultRecordTypeId',fieldApiName: RD_AVAILABILITY_IN})//PENDING IMPORTS
    rdAvaiInValues;

    //getting location values
    @wire(getPicklistValues,{recordTypeId: '$resDetailObj.data.defaultRecordTypeId',fieldApiName: RD_LOCATION}) //PENDING IMPORTS
    rdLocationValues;

    //getting worked Skill set values
    @wire(getPicklistValues,{recordTypeId: '$resDetailObj.data.defaultRecordTypeId',fieldApiName: RD_WORKED_SKILL_SET}) //PENDING IMPORTS
    rdWorkedSkillSetValues;

                    /* HANDLE ONCHANGE FOR RESOURCE DETAIL OBJECT */
    //Availability in onChange
    handleRdAvailabilityInChange(event){
        this.getResourceDetailRecord.Availability_in__c = event.detail.value;
    }
    //worked skills set on Change
    handleWorkedSkillSetChange(event){
        this.getResourceDetailRecord.Worked_skill_set__c = event.detail.value;
    }
    //Location onChange
    handleRdLocationChange(event){
        this.getResourceDetailRecord.Location__c = event.detail.value;
    }

                        /* INPUT FIELDS ONCHANGE IN RESOURCE OBJECT*/
    // start date onChange
    handleStartDateChange(event){
        this.getResourceDetailRecord.Start_date__c = event.target.value;
    }
    // end date onChange
    handleEndDateChange(event){
        this.getResourceDetailRecord.End_date__c = event.target.value;
    }
    //Name onChange
    handleRdNameChange(event){
        this.getResourceDetailRecord.Name = event.target.value;
    } 
    //Project onChange
    handleRdProjectChange(event){
        this.getResourceDetailRecord.Project__c = event.target.value;
    }
    //Served Company onChange
    handleRdServedCompanyChange(event){
        this.getResourceDetailRecord.Served_company__c = event.detail.value;
    }

                            /*HANDLE ONCHANGE FOR RESOURCE OBJECT*/
    handleTotalExpChange(event){
        this.getResourceRecord.Total_IT_Experience__c = event.target.value;
    }
    handleRevExpChange(event){
        this.getResourceRecord.Relavent_Experience__c = event.target.value;
    }
    handleAvailabilityStatusChange(event) {
        this.getResourceRecord.Availability_status__c = event.detail.value;
    }
    handleHighestEducationChange(event) {
        this.getResourceRecord.Highest_Education__c = event.detail.value;
    }
    handleLocationResChange(event) {
        this.getResourceRecord.Location__c = event.detail.value;
    }
    handleLookingForChange(event) {
        this.getResourceRecord.Looking_for__c = event.detail.value;
    }
    handleSelectedSkillsChange(event) {
        this.getResourceRecord.Relavent_skill_set__c = event.detail.value;
    }
    handleAvailabilityInChange(event){
        this.getResourceRecord.Availability_in__c = event.detail.value;
    }

        /* DISPLAYING ALL FEILDS BUTTON */
    //click event for drop down selection
    handleShowFieldsClick() {
        this.showFields = !this.showFields;
    }
                        /*BUTTON ONCLICK*/
    handleSaveClick(){
        insertRecord({resourceData: this.getResourceRecord})
        .then((result)=>{
            console.log(result);
            this.resourceId = result.Id;
            insertResourceDetailRecord({rdData: this.getResourceDetailRecord, resDetId: this.resourceId})
            this.getResourceDetailRecord={};
            this.getResourceRecord={};
            const evt = new ShowToastEvent({
                title:'Resource Saved',
                message:'Resource and Resource Details Saved Successfully',
                variant:'success',
            });
            this.dispatchEvent(evt);
        })
        .catch(error=>{
            console.error(error);
            const evt = new ShowToastEvent({
                title:'Resource Not Saved',
                message: error.body.message,
                variant:'error',
            });
            this.dispatchEvent(evt);
        })
    }
}
