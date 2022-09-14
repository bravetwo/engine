package com.seedxr;

import android.app.Activity;
import android.app.NativeActivity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;

public class SeedController implements ServiceConnection {
    
    private final String LOG_TAG = "SeedController";
    private boolean ifBindSuccess = false;
    
    public native void onServiceConnected(IBinder binder);
    
    public void bindService(Activity context) {
        Log.d(LOG_TAG,"OpenXR Runtime pre to connect Seed Controller Service");
        Intent intent = new Intent();
        ComponentName componentName = new ComponentName("com.seed.controllerndkservice",
                "com.seed.controllerndkservice.SeedControllerService");
        intent.setComponent(componentName);
        context.bindService(intent, this, Context.BIND_AUTO_CREATE | Context.BIND_IMPORTANT);
        Log.d(LOG_TAG,"OpenXR Runtime bind Seed Controller Service " + String.valueOf(ifBindSuccess));
    }

    @Override
    public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
        Log.d(LOG_TAG,"OpenXR Runtime connect Seed Controller Service");
        onServiceConnected(iBinder);
    }

    @Override
    public void onServiceDisconnected(ComponentName componentName) {
        Log.d(LOG_TAG,"OpenXR Runtime disconnect Seed Controller Service");
    }
}
