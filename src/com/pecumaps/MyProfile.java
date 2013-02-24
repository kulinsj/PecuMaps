package com.pecumaps;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MyProfile extends Activity{
	
	//set up UI elements
	private EditText fNameText;
	private EditText lNameText;
	private EditText phoneText;
	private TextView outTextscreenName;
	private Button btnClose;
	private Button btnEdit;
	
	private boolean editting = false;
	
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.my_profile);
		
		//connect UI elements
		fNameText = (EditText) findViewById(R.id.inText_firstName);
		lNameText = (EditText) findViewById(R.id.inText_lastName);
		phoneText = (EditText) findViewById(R.id.inText_phone);
		outTextscreenName = (TextView) findViewById(R.id.outText_screenName);
		btnClose = (Button) findViewById(R.id.btn_closeMP);
		btnEdit = (Button) findViewById(R.id.btn_editProfile);
		fNameText.setInputType(0);
		fNameText.setTextColor(Color.BLACK);
		lNameText.setInputType(0);
		lNameText.setTextColor(Color.BLACK);
		phoneText.setInputType(0);
		phoneText.setTextColor(Color.BLACK);
		
		//set up close button
		btnClose.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				//TODO: save the info locally to avoid 
				//      having to retrieve it each time the profile is opened
				finish();
			}
		});
		
		//set up edit button
		btnEdit.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				if(editting){
					String fName = fNameText.getText().toString();
					String lName = lNameText.getText().toString();
					String phone = phoneText.getText().toString();
					
					//TODO: SAVE CHANGED INFO
					{
						//THIS NEEDS TO HAPPEN AFTER THE Successful return of the change call
						btnEdit.setText("Edit");
					}
					editting = false;
					
					fNameText.setEnabled(false);
					fNameText.setInputType(0);
					lNameText.setEnabled(false);
					lNameText.setInputType(0);
					phoneText.setEnabled(false);
					phoneText.setInputType(0);
				}
				else{
					editting = true;
					btnEdit.setText("Save");
					fNameText.setEnabled(true);
					fNameText.setInputType(1);
					lNameText.setEnabled(true);
					lNameText.setInputType(1);
					phoneText.setEnabled(true);
					phoneText.setInputType(3);
				}
			}
		});
		
		
		
		
	}
}
