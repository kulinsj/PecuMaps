package com.pecumaps;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapFragment;
import com.google.android.gms.maps.model.CameraPosition;
import com.google.android.gms.maps.model.LatLng;
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
		LatLng DC = new LatLng(43.47,-80.54);
		CameraPosition cameraPosition = new CameraPosition.Builder()
	    .target(DC)      // Sets the center of the map to Mountain View
	    .zoom(13)                   // Sets the zoom
	    .build();                   // Creates a CameraPosition from the builder
		theMap.animateCamera(CameraUpdateFactory.newCameraPosition(cameraPosition));
		
		//The code below will let us use the user's current location. Till then, we use DC lat long
		/*
		LocationManager locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
		LocationListener locationListener = new LocationListener() {
		    public void onLocationChanged(Location location) {
		      // Called when a new location is found by the network location provider.
		      makeUseOfNewLocation(location);
		    }

		    public void onStatusChanged(String provider, int status, Bundle extras) {}

		    public void onProviderEnabled(String provider) {}

		    public void onProviderDisabled(String provider) {}
		  };

		// Register the listener with the Location Manager to receive location updates
		locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0, 0, locationListener);
		*/
		
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
