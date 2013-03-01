package com.pecumaps;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
	
public class ProfileSetup extends Activity{
	
	//set up UI elements
		private EditText fNameText;
		private EditText lNameText;
		private EditText phoneText;
		private EditText screenNameText;
		private CheckBox checkCall;
		private CheckBox checkText;
		private Button btnCancel;
		private Button btnCreate;
		
		protected void onCreate(Bundle savedInstanceState) {
			super.onCreate(savedInstanceState);
			setContentView(R.layout.profile_setup);
			
			//This grabs the email from the previous screen, so it can be passed in as well
			//when it comes time to make the registration call
			Intent intent = getIntent();
			String email = intent.getStringExtra("email");
			
			//connect UI elements
			fNameText = (EditText) findViewById(R.id.inText_firstName);
			lNameText = (EditText) findViewById(R.id.inText_lastName);
			phoneText = (EditText) findViewById(R.id.inText_phone);
			screenNameText = (EditText) findViewById(R.id.inText_screenName);
			btnCancel = (Button) findViewById(R.id.btn_cancelPS);
			btnCreate = (Button) findViewById(R.id.btn_createProfile);
			checkCall = (CheckBox) findViewById(R.id.checkBox_CallOK);
			checkText = (CheckBox) findViewById(R.id.checkBox_TextOK);
			
			//set up the cancel Button
			btnCancel.setOnClickListener(new View.OnClickListener() {
				@Override
				public void onClick(View view) {
					finish();
				}
			});
			
			btnCreate.setOnClickListener(new View.OnClickListener() {
				@Override
				public void onClick(View view) {
					goToMainView();
					//TODO:
					//on successful creation, close this screen, close the login screen
					//so that hitting "back" from the main view will close the app, not return here OR the login screen
				}
			});
			
		}
		
		private void goToMainView(){
			Intent intent = new Intent(this, MainActivity.class);
			startActivity(intent);
		}
	
}
