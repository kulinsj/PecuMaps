package com.pecumaps;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;

public class PostJob extends Activity{

	//declare UI elements
	private Button btnClose;
	private Button btnPost;
	private EditText inTextJobTitle;
	private EditText inTextJobLocation;
	private EditText inTextJobDesc;
	private EditText inTextJobPay;
	private EditText inTextJobPayPerWhat;
	private CheckBox flatCheck;
	private TextView perText;
	
	private boolean flat = true;
	
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.post_a_job);
		
		//connect UI elements
		btnClose = (Button) findViewById(R.id.btn_closePJ);
		btnPost = (Button) findViewById(R.id.btn_postJob);
		inTextJobTitle = (EditText) findViewById(R.id.inText_jobTitile);
		inTextJobLocation = (EditText) findViewById(R.id.inText_jobLocation);
		inTextJobDesc = (EditText) findViewById(R.id.inText_desc);
		inTextJobPay = (EditText) findViewById(R.id.inText_pay);
		inTextJobPayPerWhat = (EditText) findViewById(R.id.inText_perWhat);
		flatCheck = (CheckBox) findViewById(R.id.checkBox_flatRate);
		perText = (TextView) findViewById(R.id.outText_per);
		
		//sets up the "flat" check box to show/hide the extra field
		flatCheck.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				if(flat){
					flat = false;
					perText.setVisibility(View.VISIBLE);
					inTextJobPayPerWhat.setVisibility(View.VISIBLE);
				}
				else{
					flat = true;
					perText.setVisibility(View.INVISIBLE);
					inTextJobPayPerWhat.setVisibility(View.INVISIBLE);
				}
			}
		});
		
		//set up cancel button
		btnClose.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				finish();
			}
		});
		//set up post job button
		btnPost.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				//TODO: Validate input
				//TODO: post the job. remember to check if "flat" is checked and handle it appropriately
				//TODO: on successful post, jump back ("finish();") 2 screens to map view and "click" the newly posted job
			}
		});
	}
}
