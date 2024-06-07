package com.ttp.modules

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.google.firebase.firestore.FirebaseFirestore

class FirestoreModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    // Initialise a FirebaseFireestore instance to interact with the Firestore database
    private val db = FirebaseFirestore.getInstance()

    // Returns the name of the module, which will be referenced in the React Native files
    override fun getName(): String {
        return "FirestoreModule"
    }

    @ReactMethod
    fun createUserProfile(userId: String, profileData: ReadableMap, promise: Promise) {

        // Converts ReadableMap to a HashMap to work with native Java types, writing data to the specificed document,
        // creating the document if it doesn't already exist
        db.collection("users").document(userId).set(profileData.toHashMap())
            .addOnSuccessListener {
                
                // If the write operation is successful, resolve the promise with a success message
                promise.resolve("User profile created successfully.")
            }
            .addOnFailureListener { e ->

                // If the write operation fails, reject the promise with the error message
                promise.reject("ERROR_CREATING_PROFILE", e.message)
            }
    }

    @ReactMethod
    fun getUserProfile(userId: String, promise: Promise) {

        // Retrieves the document with the given userId from the "users" collection
        db.collection("users").document(userId).get()
            .addOnSuccessListener { document ->
                if (document != null && document.exists()) {

                    // If the document is successfully retrieved and exists, resolve the promise with the document data
                    promise.resolve(document.data)
                } else {

                    // If no document exists, reject the promise with an appropriate error message
                    promise.reject("ERROR_FETCHING_PROFILE", "No profile found.")
                }
            }
            .addOnFailureListener { e ->
            
                // If the retrieval operation fails, reject the promise with the error message
                promise.reject("ERROR_FETCHING_PROFILE", e.message)
            }
    }

    @ReactMethod
    fun updateUserProfile(userId: String, profileData: ReadableMap, promise: Promise) {
        val dataMap = profileData.toHashMap()
        db.collection("users").document(userId).set(dataMap)
            .addOnSuccessListener {
                promise.resolve("Profile updated successfully.")
            }
            .addOnFailureListener { e ->
                promise.reject("ERROR_UPDATING_PROFILE", e.message)
            }
    }
}