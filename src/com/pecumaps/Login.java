package com.pecumaps;


import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class Login extends Activity {
	
	private EditText eMailText;
	private EditText passText;
	private EditText passConfText;
	private TextView logSign;
	private TextView loginError;
	private Button toggleButton;
	
	private boolean registering;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.login_screen);
		
		//connect UI elements
		eMailText = (EditText) findViewById(R.id.inText_email);
		passText = (EditText) findViewById(R.id.inText_pass1);
		passConfText = (EditText) findViewById(R.id.inText_pass2);
		logSign = (TextView) findViewById(R.id.outText_log_sign);
		loginError = (TextView) findViewById(R.id.outText_login_error);
		toggleButton = (Button) findViewById(R.id.btn_log_sign_toggle);
		
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
		
		
		
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.login_screen, menu);
		return true;
	}

}
