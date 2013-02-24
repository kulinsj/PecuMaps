package com.pecumaps;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import android.net.ParseException;
import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;
import com.pecumaps.AsyncHttpPost.GetJSONListener;

public class Login extends Activity implements GetJSONListener{
	
	//declare UI elements
	private EditText eMailText;
	private EditText passText;
	private EditText passConfText;
	private TextView logSign;
	private TextView loginError;
	private Button toggleButton;
	private Button goButton;
	private RelativeLayout MainCont;
	private RelativeLayout loadingCont;
	
	//set up private variables
	private boolean registering;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.login_screen);
		final Login act = this;
		
		//connect UI elements
		eMailText = (EditText) findViewById(R.id.inText_email);
		passText = (EditText) findViewById(R.id.inText_pass1);
		passConfText = (EditText) findViewById(R.id.inText_pass2);
		logSign = (TextView) findViewById(R.id.outText_log_sign);
		loginError = (TextView) findViewById(R.id.outText_login_error);
		toggleButton = (Button) findViewById(R.id.btn_log_sign_toggle);
		goButton = (Button) findViewById(R.id.btn_go);
		MainCont = (RelativeLayout) findViewById(R.id.MainCont);
		loadingCont = (RelativeLayout) findViewById(R.id.loadingCont);
		
		
		//set up for login/register toggling
		registering = false;
		
		
		toggleButton.setOnClickListener(
			new View.OnClickListener() {
				@Override
				public void onClick(View view) {
					if(registering){
						toggleButton.setText("Sign Up");
						registering = false;
						passConfText.setVisibility(View.INVISIBLE);
						logSign.setText("Log In");
					}
					else{
						toggleButton.setText("Log In");
						registering = true;
						passConfText.setVisibility(View.VISIBLE);
						logSign.setText("Sign Up");
					}
				}
			});
		//on Go buttin click
		goButton.setOnClickListener(
			new View.OnClickListener() {
				@Override
				public void onClick(View view) {
					//either log in
					if(!registering){
						loadingCont.setVisibility(View.VISIBLE);
						HashMap<String,String> data = new HashMap<String,String>();
						data.put("email", eMailText.getText().toString());
						data.put("password", passText.getText().toString());
						AsyncHttpPost asyncHttpPost = new AsyncHttpPost(data,act);
						asyncHttpPost.execute("login/");
					}
					//or register
					else{
						//TO-DO:  REGISTER NEW USER HERE
					}
				}
			});
	}
	
	private void putToast(String message) {
		Toast toast = Toast.makeText(getApplicationContext(), message, Toast.LENGTH_LONG);
		toast.show();
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.login_screen, menu);
		return true;
	}
	
	@Override
	public void onRemoteCallComplete(String jsonFromNet) {
		Log.d("got it back!", jsonFromNet);
		JSONObject response;
		try{
			response = (JSONObject) new JSONTokener(jsonFromNet).nextValue();
			if(response != null){
				if(response.getString("success")=="false"){
					//failed, notify user why
					loadingCont.setVisibility(View.INVISIBLE);
					putToast(response.getString("message"));
				}
				else if(!registering){
					//login successful
					Intent intent = new Intent(this, MainActivity.class);
					startActivity(intent);
					finish();
				}
				else{
					//register successful
					
				}
			}
		} catch (JSONException e) {
	        e.printStackTrace();
	    } 
	}
}





















