const dateInstance = new Date();
const currentYear  = dateInstance.getFullYear();

const translations = {
	"en": {
		"inputsErrors" : {
			"name":"Only letters and whitespace are allowed",
			"email":"Only without Cyrillic and without spaces",
			"subject":"Only letters and whitespace are allowed",
		},
		"footer" :{
			"footer_text" : "© Copyright "+currentYear+" by Superfeed. All Rights Reserved.",
		},
		"BtnBack" :{
			"BtnBack_text" : "Back",
		},
		"login_step": {
			"heading" : "Login",
			"description" : "<p>View your Superfeeds by logging in with <br>Google or LinkedIn. Any CRM that matches.</p>",
			"login_btn_1_text" : "Continue with</i>",
			"login_btn_2_text" : "Continue with</i>",
		},
		"signup_step": {
			"heading" : "Sign up",
			"description" : "<p>Porttitor rhoncus dolor purus enim praesent elementum facilisis leo.</p>",
			"signup_btn_1_text" : "Continue with</i>",
			"signup_btn_2_text" : "Continue with</i>",
		},
		"welcome_step": {
			"heading" : "Welcome",
			"description" : "	<p>Ready to transform the way your community communicates? Just give us 5 minutes. Here’s what we’ll need from you:</p><ol><li>Your name</li> <li>Your community’s name</li><li>Permission to sync to your CRM.</li></ol><p>That’s it! Just click the button below to continue.</p>",
			"welcome_step_btn" : "LET’S GO",
		},
		"personality_step" : {
			"heading" : "What’s your name?",
			"description" : "<p class='test'>Maybe you’ll be “just” a customer. Maybe you’ll become my best friend. Either way, let’s get to\n" +
				"know one another a bit better.</p><br><p>My name’s Nathan. My email is <a href=\"nathan@superfeed.io.\" class=\"link-purple-light\">nathan@superfeed.io.</a><br>My coolest moment ever was when I met The Edge from U2, made a joke and he laughed.</p><h4 class=\"mt-15 mb-15\">What’s your name?</h4>",
			"personality_step_btn" : "LET’S NAME",
			"placeholder_1" : "Type your full name...",
			"placeholder_2" : "Type your email...",
			"placeholder_3" : "Type your invitation code",
		},
		"community_step": {
			"heading" : "What’s your community’s name?",
			"description" : "<p>Imagine you're telling someone to go to \"<a href='' class='link-black'>www.superfeed/[something]</a>\" Tell us that something,<br>so we can give your community a unique URL.</p> <h4 class=\"mt-15 mb-15\">After this, we’ll ask to sync CRMs, and then the fun starts!</h4>",
			"community_step_btn": "LET’S SYNC",
			"placeholder_1" : "Type your company’s name...",
			"placeholder_2" : "Type the name of your community...",
		},
		"which_crm":{
			"heading" : "Which CRM do you use?",
			"description" : "More CRMs coming soon",
			"which_crm_btn" : "LET’S START",
		},
		"set_api_key":{
			"heading" : "Set API Key",
			"description" : "<p class=\"text-left mb-15\">1. Go to the <a href=\"doe.com\" class=\"link-black\">doe.com</a> website and create a free account<br>(you will need to confirm your email).<br>2. After that you can find your API key<br>here: <a href=\"https://doe.com/profile#api-key\" class=\"link-black\">https://doe.com/profile#api-key</a>.</p>",
			"set_api_key_btn" : "SAVE",
			"placeholder" : "API Key",
		},
		"willYouReadThisBlock":{
			"heading" : "Will you read this?",
			"description" : "<p class='mb-10'>Ah, the terms & services agreement. So. much. fun.  But our lawyers say that it’s actually quite important, so here we are.</p><p>What about payment you ask? Here’s the deal. You get to use Superfeed for <a href=\"#\" class=\"link-purple\"> 14 days for free</a>. If you like it, then we will ask nicely that you pay. If you don’t like it, then we will keep you in our system and send you annoying updates until you unsubscribe. </p>",
			"willYouReadThisBlock_btn": "LET’S READ",
		},
		"willYouReadThisBlock2":{
			"heading" : "Will you read this?",
			"description" : "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras sed felis eget velit aliquet sagittis id consectetur. Eu lobortis elementum nibh tellus molestie nunc non. Aliquam purus sit amet luctus. Purus gravida quis blandit turpis cursus in. Sed turpis tincidunt id aliquet risus feugiat in ante. Porttitor eget dolor morbi non arcu risus. Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. Ac auctor augue mauris augue neque gravida in fermentum et. Urna molestie at elementum eu facilisis. Purus gravida quis blandit turpis cursus in hac habitasse platea. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper.<br> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras sed felis eget velit aliquet sagittis id consectetur. Eu lobortis elementum nibh tellus molestie nunc non. Aliquam purus sit amet luctus. Purus gravida quis blandit turpis cursus in. Sed turpis tincidunt id aliquet risus feugiat in ante. Porttitor eget dolor morbi non arcu risus. Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. Ac auctor augue mauris augue neque gravida in fermentum et. Urna molestie at elementum eu facilisis. Purus gravida quis blandit turpis cursus in hac habitasse platea. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper. </p>",
			"willYouReadThisBlock2_btn": "Accepted",
		},
		"shallWeStart":{
			"heading" : "Phew. Shall we start?",
			"description" : "<p>Okay. Now that that’s done with, we can actually start.<br />Here’s we’ll ask:</p> <ol><li> What rules determine whether someone<br>is a member of your community</li><li> What fields in your CRM should Superfeed pull<br>to determine the audiences for individual posts</li><li> Who else should receive admin access</li></ol><p class='font-size-16'> Worried that you’ll change your mind later?<br>No worries, you can always edit your preferences later!</p>",
			"shallWeStart_btn" : "LET’S SET THIS UP",
		},
		"createAccessRules":{
			"heading" : "Create Access Rules",
			"description" : "<p>Your CRM may contain 50,000 people, while your community<br>is comprised of 500 people. Superfeed gives you the ability to determine precisely who can access your feed. Simply choose the field(s), operators, and values that separate contact from community member. Remember to add a rule that will allow your fellow staff to access! </p> <h4 class=\"mt-10\">Sample rule:</h4> <p>Contact: Status equals Active</p>",
			"createAccessRules_btn" : "LET’S MAKE SOME RULES",
		},
		"addRules":{
			"heading" : "Add Rules",
			"label_text_1":"Select field",
			"label_text_2":"Select operator",
			"label_text_3":"Select Value",
			"addRules_btn" : "SAVE",
		},
		"editRules":{
			"heading" : "Edit Rules",
			"description":"Congrats! You’ve created your first rules. <br> You can always add or remove these rules later. ",
			"editRules_btn" : "NEXT",
		},
		"selectFieldsPull":{
			"heading" : "Select Fields to Pull",
			"description":"<p>Select the fields in your CRM that you'd like to pull into your Superfeed. These fields will either be used to target an<br>audience for a post, build dynamic user profiles, or both.<br>When you update your CRM, you will automatically<br>update your Superfeed.</p> <h4>Sample tags:</h4> <p>Title, Industry</p> <h4>Sample audience:</h4> <p>Title = CEO, Industry = Fintech<br>Only Fintech CEOs can see the post.</p>",
			"selectFieldsPull_btn" : "LET’S PULL SOME TAGS",
		},
		"addTags":{
			"heading" : "Add Tags",
			"select_1" : "Select field",
			"select_2" : "Tags will be used to",
			"addTags_btn" : "SAVE",
		},
		"editTags":{
			"heading" : "Edit Tags",
			"title_1" : "Email",
			"title_2" : "Title",
			"editTags_btn" : "CONFIRM ADMINS",
		},
		"addAdmin":{
			"heading" : "Add Admin",
			"description" : "<p>As an admin, you are the superhero of Superfeed. Your special abilities include: the ability to view analytics, edit the rules that determine access, and edit the tags pulled in. If you’re feeling generous, you can also give other people admin access.</p><br><h4>Do you want to give anyone else admin abilities?</h4>",
			"addAdmin_btn_1" : "NO, KEEP THE POWER",
			"addAdmin_btn_2" : "YES, SHARE THE POWER",
		},
		"admin":{
			"heading" : "Settings",
			"menu_1" : "Analytics",
			"menu_2" : "Admins",
			"menu_3" : "Tags",
			"menu_4" : "Access",
			"menu_5" : "Tools",
			"menu_6" : "Import",
		},
		"analytics" : {
			"menu_1" : "Overall",
			"menu_2" : "Title",
			"menu_3" : "Geography",
			"menu_4" : "Industry",
		},
		"feed": {
			"show" : "Show",
			"hide" : "Hide",
			"comment" : "comment",
			"comments" : "comments",
			"reply" : "Reply",
			"delete" : "Delete",
		},
		"adminAllRules": {
			"btn" : "ADD RULE",
		},
		"adminAddRules": {
			"header" : "Add Rule",
			"btn" : "ADD RULES",
		},
		"adminTools": {
			"header" : "Admin Tools",
		},
		"NewAudienceTitle": {
			"NewAudienceTitle_placeholder" : "Title",
			"NewAudienceTitle_btn" : "SAVE",
		},
		"NewAudienceIndustry": {
			"NewAudienceIndustry_placeholder" : "Semper",
			"NewAudienceIndustry_btn" : "SAVE INDUSTRY",
		},
		"NewAudienceGeography": {
			"NewAudienceGeography_placeholder" : "Detroit",
			"NewAudienceGeography_btn" : "NEXT",
		},
		"NewAudience": {
			"NewAudience_btn" : "NEXT",
		},
		"NewAudienceList":{
			"NewAudienceList_placeholder" : "Find user",
			"NewAudienceList_result" : "results",
			"NewAudienceList_btn" : "Save as Audience",
		},
		"new_comment": {
			"placeholder": "Suggest a post...",
			"select_audience": "Select Audience",
			"anonymously_label": "Post anonymously",
		},
		"editProfile": {
			"editProfile_header": "Edit profile",
			"editProfile_btn": "Edit profile",
		},
		"NewAudienceGeographySave": {
			"NewAudienceGeographySave_btn_1" : "POST",
			"NewAudienceGeographySave_btn_2" : "Save",
			"NewAudienceGeographySave_placeholder" : "Post to Audience or Save the Audience"
		},
		"download_img": {
			"download_img_header" : "Download image",
			"download_btn_1" : "Save",
			"download_btn_2" : "Image"
		},
		"adminAllTags": {
			"adminAllTags_btn" : "ADD TAG"
		},
		"adminAddTags": {
			"adminAddTags_heading" : "Add Tag",
			"adminAddTags_btn" : "SAVE TAG",
		},
		"adminAddAdmins": {
			"adminAddAdmins_input" : "Add admin",
			"adminAddAdmins_btn" : "save as admin",
		},
		"adminAllAdmins": {
			"adminAllAdmins_btn" : "ADD ADMIN",
		},
		"newAudience": {
			"newAudience_header" : "New audience",
			"newAudienceMenuItem1" : "Title",
			"newAudienceMenuItem2" : "Industry",
			"newAudienceMenuItem3" : "Geography",
		},
		"importWindow": {
			"importWindow_btn" : "IMPORT CRM",
		},
		"search": {
			"search_placeholder" : "Search tags...",
		},
		"importConfirmation": {
			"heading" : "Import confirmation",
			"label_1" : "Select base",
			"label_2" : "Select table",
			"placeholder_1" : "Base",
			"placeholder_2" : "Table",
			"btn" : "Save",
		},
		"setup": {
			"heading" : "Setup",
			"label_1" : "Location",
			"label_2" : "Industry",
			"label_3" : "Name",
			"label_4" : "Organization",
			"label_5" : "Title",
			"label_6" : "Email",
			"btn" : "Save",
		},
		"preview": {
			"heading" : "Preview",
			"label_1" : "Location",
			"label_2" : "Industry",
			"label_3" : "Name",
			"label_4" : "Organization",
			"label_5" : "Title",
			"label_6" : "Email",
			"btn" : "Save",
		},
		"select_audience":{
			"heading" : "Select audience",
		}
	},

}

export default translations;