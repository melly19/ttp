package com.ttp.modules

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.auth.auth
import com.google.firebase.Firebase

class AuthModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val auth: FirebaseAuth = FirebaseAuth.getInstance()

    override fun getName(): String {
        return "AuthModule"
    }

    @ReactMethod
    fun getCurrentUserUID(promise: Promise) {
        val currentUser = FirebaseAuth.getInstance().currentUser
        if (currentUser != null) {

            // Add logging statement here for current user being able to log in
            promise.resolve(currentUser.uid)
        } else {

            // Add logging statement here too
            promise.reject("ERROR_NO_USER", "No user is currently logged in.")
        }
    }

    @ReactMethod
    fun createUserWithEmail(email: String, password: String, promise: Promise) {
        auth.createUserWithEmailAndPassword(email, password)
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {

                    // Add logging statement for successful creation for user with email
                    promise.resolve(auth.currentUser?.uid)
                } else {

                    // Add logging statement for errors while creating a user
                    promise.reject("CREATE_USER_ERROR", task.exception?.message ?: "Unknown error")
                }
            }
    }

    @ReactMethod
    fun signInWithEmail(email: String, password: String, promise: Promise) {
        auth.signInWithEmailAndPassword(email, password)
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    promise.resolve(auth.currentUser?.uid)
                } else {
                    promise.reject("SIGN_IN_ERROR", task.exception?.message ?: "Unknown error")
                }
            }
    }

    @ReactMethod
    fun sendPasswordResetEmail(email: String, promise: Promise) {
        auth.sendPasswordResetEmail(email)
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    promise.resolve("Email sent")
                } else {
                    promise.reject("RESET_EMAIL_ERROR", task.exception?.message ?: "Unknown error")
                }
            }
    }

    @ReactMethod
    fun sendEmailVerification(promise: Promise) {
        val user = auth.currentUser
        user?.sendEmailVerification()?.addOnCompleteListener { task ->
            if (task.isSuccessful) {
                promise.resolve("Verification email sent")
            } else {
                promise.reject("EMAIL_VERIFICATION_ERROR", task.exception?.message ?: "Unknown error")
            }
        }
    }

    @ReactMethod
    fun signOut(promise: Promise) {
        auth.signOut()
        promise.resolve(null)
    }

    @ReactMethod
    fun getCurrentUser(promise: Promise) {
        val user = auth.currentUser
        if (user != null) {
            promise.resolve(user.uid)
        } else {
            promise.resolve(null)
        }
    }
}

