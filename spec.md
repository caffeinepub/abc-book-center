# ABC Book Center

## Current State
The contact form (Name, Phone, Book Requirement) submits data to the backend via `useSubmitForm`. On success, it shows a toast notification. The WhatsApp button is a static link that opens WhatsApp with no pre-filled message.

## Requested Changes (Diff)

### Add
- After a successful form submission, automatically open WhatsApp with a pre-filled message containing the customer's Name, Phone, and Book Requirement so the store owner receives the inquiry directly on WhatsApp.

### Modify
- `handleSubmit` in `ContactSection`: after `submitForm.mutateAsync` succeeds, construct a WhatsApp URL with the form data encoded as a message and open it in a new tab.
- Success toast message to reflect that WhatsApp will open with their details.

### Remove
- Nothing removed.

## Implementation Plan
1. In `handleSubmit`, after successful backend submission, build a WhatsApp message string like:
   `New Enquiry from ABC Book Center Website\nName: {name}\nPhone: {phone}\nBook Requirement: {bookRequirement}`
2. URL-encode the message and open `https://wa.me/919934756863?text=<encoded_message>` in a new tab.
3. Update the success toast to say "Enquiry sent! WhatsApp is opening with your details."

## UX Notes
- WhatsApp opens in a new tab so the customer stays on the website.
- The message is pre-filled so the owner immediately sees the inquiry details.
- This works on both mobile (opens WhatsApp app) and desktop (opens WhatsApp Web).
