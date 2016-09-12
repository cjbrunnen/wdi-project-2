// public void findPlace(View view) {
//     try {
//         Intent intent =
//                 new PlaceAutocomplete.IntentBuilder(PlaceAutocomplete.MODE_FULLSCREEN)
//                         .setFilter(typeFilter)
//                         .build(this);
//         startActivityForResult(intent, PLACE_AUTOCOMPLETE_REQUEST_CODE);
//     } catch (GooglePlayServicesRepairableException e) {
//         // TODO: Handle the error.
//     } catch (GooglePlayServicesNotAvailableException e) {
//         // TODO: Handle the error.
//     }
// }
//
// // A place has been received; use requestCode to track the request.
// @Override
// protected void onActivityResult(int requestCode, int resultCode, Intent data) {
//     if (requestCode == PLACE_AUTOCOMPLETE_REQUEST_CODE) {
//         if (resultCode == RESULT_OK) {
//             Place place = PlaceAutocomplete.getPlace(this, data);
//             Log.i(TAG, "Place: " + place.getName());
//         } else if (resultCode == PlaceAutocomplete.RESULT_ERROR) {
//             Status status = PlaceAutocomplete.getStatus(this, data);
//             // TODO: Handle the error.
//             Log.i(TAG, status.getStatusMessage());
//
//         } else if (resultCode == RESULT_CANCELED) {
//             // The user canceled the operation.
//         }
//     }
// }
