import { createdAudienceData, exportFieldsData, previewTagsData, peopleAudienceData,
	createdNewAudienceData, createTagsData, createPostData} from './stores.js';
import { get } from 'svelte/store';
import error from "svelte/types/compiler/utils/error";
import {loop_guard} from "svelte/internal";


/**
 * Debounce function
 * @param fn     - function that should be executed
 * @param time   - time delay
 * @returns {Function}
 */
export const debounce = (fn, time = 1000) => {

	if ( !fn ) {
		throw Error('"debounce function - "You didn\'t add required parameters');
	}

	let timeout;

	return function() {
		const functionCall = () => fn.apply(this, arguments);

		clearTimeout(timeout);
		timeout = setTimeout(functionCall, time);
	}
};


/**
 * Test value with regex
 * @param {(name|email|phone|postal)} fieldType  - The allowed type of the fields
 * @param value
 * @return {boolean}
 */
export const validateField = (fieldType = null, value = null) => {

	if ( !fieldType ) {
		throw Error('"validateField function - "You didn\'t add required parameters');
	}

	const phoneREGEX  = /^[0-9\+]{6,13}$/;
	const nameREGEX   = /^[a-zA-Zа-яА-Я\s]{2,30}$/;
	const postalREGEX = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
	const emailREGEX  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	const dummyREGEX  = /^.+$/;

	let checkResult   = false;

	switch (fieldType) {
		case 'name':
			checkResult = nameREGEX.test(value);
			break;
		case 'phone':
			checkResult = phoneREGEX.test(value);
			break;
		case 'postal':
			checkResult = postalREGEX.test(value);
			break;
		case 'email':
			checkResult = emailREGEX.test(value);
			break;
		case 'price':
			checkResult = dummyREGEX.test(value);
			break;
		case 'aim':
			checkResult = dummyREGEX.test(value);
			break;
		case 'date':
			checkResult = dummyREGEX.test(value);
			break;
		case 'subject':
			checkResult = dummyREGEX.test(value);
			break;
		case 'anyText':
			checkResult = dummyREGEX.test(value);
			break;
	}

	return checkResult;

};


/**
 *  Check step's field according to form step selector
 */
export const checkStepFields = (formStepSelector) => {
	if ( !formStepSelector ) return false;

	let errorCheckArr  = [];
	const inputToCheck = document.querySelectorAll(`[data-role="${formStepSelector}"] input[data-input-role]`);

	[...inputToCheck].forEach( (item, index) => {
		const checkField     = +validateField( item.dataset.inputRole, item.value );
		const operationType  = (checkField) ? 'remove' : 'add';
		errorCheckArr[index] = checkField;

		item.classList[operationType]('error');
	});

	return ( errorCheckArr.reduce( (accum, current) => accum+current, 0 ) === errorCheckArr.length );
}


/**
 * Save to localStorage entered user's data
 *
 * @param formStepSelector
 * @return {boolean}
 */
export const saveEnteredUserData = (formStepSelector) => {
	const fieldsToSave = document.querySelectorAll(`[data-role="${formStepSelector}"] [data-input-role]`);

	if ( !fieldsToSave ) return false;

	let updatedData = {};

	// Update according fields
	[...fieldsToSave].forEach( item => {

		if ( item.type === 'radio' && !item.checked ) {
			return false;
		}

		if ( updatedData[item.name] ) {
			let temp = [...updatedData[item.name], item.value];
			updatedData[item.name] = [...new Set(temp)];

		} else {
			updatedData[item.name] = [item.value];
		}

	});

	if ( formStepSelector === 'user-personality' ) {
		let tempData = {
			"user_name" : updatedData.user_name[0],
			"user_email" : updatedData.user_email[0],
			"user_code" : updatedData.user_code[0],
		}
		peopleAudienceData.update( (n) => tempData);
	}

	if ( formStepSelector === 'user-community' ) {
		createdAudienceData.update( (n) => updatedData);
	}

	if ( formStepSelector === 'user-which-crm' ) {
		let tempData = {
			"driver" : updatedData.user_crm_name[0]
		}
		exportFieldsData.update( (n) => tempData);
	}

	if ( formStepSelector === 'user-api-key' ) {
		let tempData = {
			...get(exportFieldsData),
			"key"    : updatedData.user_api_key[0]
		}
		exportFieldsData.update( (n) => tempData);
	}

	if ( formStepSelector === 'user-import-step' ) {
		let tempData = {
			...get(exportFieldsData),
			"base"   : updatedData.user_import_base[0],
			"table"  : updatedData.user_import_table[0]
		}

		exportFieldsData.update( (n) => tempData);
	}

	if ( formStepSelector === 'user-setup' ) {
		let tempData = {
			...get(exportFieldsData),
			"fields" : {
				"Email": updatedData['email'][0],
				"Name": updatedData['name'][0],
				"Location": updatedData['location'][0],
				"Organization": updatedData['organization'][0],
				"Title": updatedData['title'][0],
				"Industry": updatedData['industry'][0],
			}
		}

		previewTagsData.update( (n) => tempData);
	}

	//localStorage.setItem( 'entered-user-data', JSON.stringify(updatedData) );

	return true;
}



/**
 * Save to Store entered audience data
 *
 * @param formStepSelector
 * @return {boolean}
 */
export const saveEnteredAudienceData = (formStepSelector) => {
	const fieldsToSave = document.querySelectorAll(`[data-role="${formStepSelector}"] [data-input-role]`);

	if ( !fieldsToSave ) return false;

	let updatedData = {...get(createdNewAudienceData)};

	// Update according fields
	[...fieldsToSave].forEach( item => {

		if (updatedData[item.name]) {
			let temp = [...updatedData[item.name], item.value];
			updatedData[item.name] = [...new Set(temp)];
		} else {
			updatedData[item.name] = [item.value];
		}

	});
	createdNewAudienceData.update( (n) => updatedData);
	return true;
}



/**
 * Save to Store entered post data
 *
 * @param formStepSelector
 * @return {boolean}
 */
export const saveEnteredPostData = (formStepSelector) => {
	const fieldsToSave = document.querySelectorAll(`[data-role="${formStepSelector}"] [data-input-role]`);

	if ( !fieldsToSave ) return false;

	let updatedData = {...get(createPostData)};

	// Update according fields
	[...fieldsToSave].forEach( item => {

		if (updatedData[item.name]) {
			let temp = [...updatedData[item.name], item.value];
			updatedData[item.name] = [...new Set(temp)];
		} else {
			updatedData[item.name] = [item.value];
		}

	});
	createPostData.update( (n) => updatedData);
	return true;
}



/**
 * Save to localStorage entered rule's data
 *
 * @param formStepSelector
 * @return {boolean}
 */
export const saveEnteredRuleData = (formStepSelector) => {
	const fieldsToSave = document.querySelectorAll(`[data-role="${formStepSelector}"] [data-input-role]`);

	if ( !fieldsToSave ) return false;
	let updatedData = [];

	// Update according fields
	[...fieldsToSave].forEach( (item, index) => {
		const groupIndex = item.dataset.groupIndex;
		const itemValue  = (item.name).replace(/[\[\] ]/g, "");

		updatedData[groupIndex] = {
			...updatedData[groupIndex],
			[itemValue] : item.value
		}
	});

	localStorage.setItem( 'entered-rule-data', JSON.stringify(updatedData) );

	return true;
}



/**
 * Save to Store entered tag's data
 *
 * @param formStepSelector
 * @return {boolean}
 */
export const saveEnteredTagData = (formStepSelector) => {
	const fieldsToSave = document.querySelectorAll(`[data-role="${formStepSelector}"] [data-input-role]`);

	if ( !fieldsToSave ) return false;
	//let updatedData = [];
	let updatedData = {...get(createTagsData)};

	// Update according fields
	[...fieldsToSave].forEach( (item, index) => {
		const groupIndex = item.dataset.groupIndex;
		const itemValue  = (item.name).replace(/[\[\] ]/g, "");

		updatedData[groupIndex] = {
			...updatedData[groupIndex],
			[itemValue] : item.value
		}
	});
	console.log('saveEnteredTagData - updatedData -----', updatedData);
	// localStorage.setItem( 'entered-tag-data', JSON.stringify(updatedData) );
	createTagsData.update( (n) => updatedData);

	return true;
}



/**
 * Save to localStorage entered admins's data
 *
 * @param formStepSelector
 * @return {boolean}
 */
export const saveEnteredAdminData = (formStepSelector) => {
	const fieldsToSave = document.querySelectorAll(`[data-role="${formStepSelector}"] [data-input-role]`);

	if ( !fieldsToSave ) return false;
	let updatedData = [];

	// Update according fields
	[...fieldsToSave].forEach( (item, index) => {
		const itemValue  = (item.name).replace(/[\[\] ]/g, "");

		updatedData[index] = {
			...updatedData[index],
			[itemValue] : item.value
		}
	});

	localStorage.setItem( 'entered-admin-data', JSON.stringify(updatedData) );

	return true;
}



/**
 * Fade Out method
 * @param el
 */
export function fadeOut(el){
	el.style.opacity = 1;

	(function fade() {
		if ((el.style.opacity -= .1) < 0) {
			el.style.display = "none";
		} else {
			requestAnimationFrame(fade);
		}
	})();
}



/**
 * Fade In method
 * @param el
 * @param display
 */
export function fadeIn(el, display){
	el.style.opacity = 0;
	el.style.display = display || "block";

	(function fade() {
		let val = parseFloat(el.style.opacity);
		if (!((val += .1) > 1)) {
			el.style.opacity = val;
			requestAnimationFrame(fade);
		}
	})();
}


/**
 * Send data to backend
 *
 * @param dataToSent
 * @param endpoint
 * @param method
 * @param isFormData
 * @returns {boolean}
 */
export const makeRequestToBackend = async (dataToSent = false, endpoint, method, isFormData = false) => {

	const DOMAIN_FOR_REQUEST  = __myapp.env.DOMAIN_FOR_REQUEST;
	let myHeaders             = new Headers();
	let data                  = '';
	const isProd              = __myapp.env.isProd;
	let develop_get_param = '';

	if ( !isProd ) {
		console.log('Cookie check');
		develop_get_param = '?test_user=2';
	}

	myHeaders.append("Accept", "application/json");

	if ( endpoint === '/export/preview' || endpoint === '/export/load' ) {
		data = new URLSearchParams();
		data.append("key", dataToSent?.key );
		data.append("driver", dataToSent?.driver );
		data.append("base", dataToSent?.base );
		data.append("table", dataToSent?.table );
		data.append("fields[Email]", dataToSent?.fields['Email'] );
		data.append("fields[Name]", dataToSent?.fields['Name'] );
		data.append("fields[Location]", dataToSent?.fields['Location'] );
		data.append("fields[Organization]", dataToSent?.fields['Organization'] );
		data.append("fields[Title]", dataToSent?.fields['Title'] );
		data.append("fields[Industry]", dataToSent?.fields['Industry'] );
	}
	else {

		// FormDta variant
		if ( dataToSent && isFormData ) {
			data = new FormData();
			for (let key in dataToSent) {
				data.append(key, dataToSent[key]);
			}
		}

		// URLSearchParams variant
		if ( dataToSent && !isFormData ) {
			data = new URLSearchParams();
			for (let key in dataToSent) {
				data.append(key, dataToSent[key]);
			}
		}

	}

	console.log('v.26.02.2021 21:49');

	console.log('makeRequestToBackend', makeRequestToBackend);

	let requestOptions = {
		method   : method,
		headers  : myHeaders,
		//redirect : 'follow'
	};

	if ( method.toLowerCase() === 'post' ) {
		requestOptions.body = data;
	}

	const response   = await fetch(DOMAIN_FOR_REQUEST+endpoint+develop_get_param, requestOptions);

	if ( +response.status !== 200 ) {
		const error = await response.json();
		return {
			status  : response.status,
			message : error.message
		};
	}

	return await response.text();
}


/**
 * Get selected values from multiple select
 *
 * @param element
 * @returns {*[]}
 */
export const getMultiSelectValues = (element) => {
	let checked = document.querySelectorAll(`${element} :checked`);
	return [...checked].map(option => option.value);
}