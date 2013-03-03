package com.pecumaps;


import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.widget.ImageView;

public class LoadingIn extends Activity{
	
	//private ImageView img;
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.loading_screen);
		/*
		img = (ImageView) findViewById(R.id.logoRotate);
		Animation rotation = AnimationUtils.loadAnimation(this, R.anim.clockwise_rot);
		img.startAnimation(rotation);
		*/
		final Handler handler = new Handler();
		handler.postDelayed(new Runnable() {
		  @Override
		  public void run() {
		    loaded();
		  }
		}, 2000);
	}
	private void loaded(){
		Intent intent = new Intent(this, Login.class);
		startActivity(intent);
		finish();
	}
}
