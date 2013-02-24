package com.pecumaps;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

import com.pecumaps.AsyncHttpPost.GetJSONListener;

public class MainActivity extends Activity implements GetJSONListener {
	
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main_view);
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	@Override
	public void onRemoteCallComplete(String jsonFromNet) {
		Log.d("got it back!", jsonFromNet);
		JSONObject response;
		try{
			response = (JSONObject) new JSONTokener(jsonFromNet).nextValue();
			if(response != null){
				Log.d("success", "success  is  "+response.getString("success"));
			}
		} catch (JSONException e) {
	        e.printStackTrace();
	    } 
	}
}
