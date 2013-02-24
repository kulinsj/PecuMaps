package com.pecumaps;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ExpandableListView;

public class Menu extends Activity{
	
	//declare UI elements
	private Button btnMyProfile;
	private Button btnSettings;
	private Button btnPostAJob;
	private Button btnClose;
	private ExpandableListView notificationsList;
	
	
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.menu);
		
		//connect UI elements
		btnMyProfile = (Button)findViewById(R.id.btn_myProfile);
		btnSettings = (Button)findViewById(R.id.btn_settings);
		btnPostAJob = (Button)findViewById(R.id.btn_postAJob);
		btnClose = (Button)findViewById(R.id.btn_close);
		notificationsList = (ExpandableListView)findViewById(R.id.notificationsListView);
		
		
		//set up button actions
		btnMyProfile.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				openMyProfile();
			}
		});
		btnSettings.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				//OPEN settings screen
			}
		});
		btnPostAJob.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				//OPEN post a job screen
			}
		});
		btnClose.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				//TODO: save the notifications locally to avoid 
				//      having to retrieve them each time the menu is opened
				finish();
			}
		});
		
		
	}
	
	
	private void openMyProfile(){
		Intent intent = new Intent(this, MyProfile.class);
		startActivity(intent);
	}
}
