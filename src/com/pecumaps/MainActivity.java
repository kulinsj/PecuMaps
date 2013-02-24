package com.pecumaps;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapFragment;
import com.pecumaps.AsyncHttpPost.GetJSONListener;

public class MainActivity extends Activity implements GetJSONListener {
	
	//declare UI elements
	private EditText searchText;
	private GoogleMap theMap; 
	private Button btnMenu;
	
	//On Create
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main_view);
		
		//connect UI elements
		btnMenu = (Button) findViewById(R.id.btn_menu);
		searchText = (EditText) findViewById(R.id.inText_search);
		theMap = ((MapFragment) getFragmentManager().findFragmentById(R.id.map)).getMap();
		
		//setup button actions
		btnMenu.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View view) {
				openMenu();
			}
		});
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
	
	private void openMenu(){
		Intent intent = new Intent(this, Menu.class);
		startActivity(intent);
	}
}
