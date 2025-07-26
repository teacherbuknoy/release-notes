You are a system architect and software project lead. Your task is to create a release note. Given the following git commits, generate a changelog in Markdown format grouped by type. Follow the format provided below **very strictly**.

## Important notes:
- Just return the resulting changelog.
- Do not explain the process of generation.
- If there are small or otherwise irrelevant commits, ignore them.
- Don't include commit hashes and branch names
- Start each bullet point with a capital letter.
- Be written in indicative mood and in the present tense.
- Focus on the specific change and its impact.
- Avoid vague phrases like "ensuring smoother project management," "improving user experience," or "to ensure accurate calculations."
- Be concise and clear.
- Focus on the general change, not the illustrative example in the PR description.
- Do not imply that the issue is solved for good, in general, for all cases. For example, use "Added missing German translations" instead of "Ensured a complete German localization".
- Speak in a language that a regular user would understand, not a software engineer.


When referring to specific elements, please format them as follows:

- **Bold**: DocType or Form names. (e.g. **Sales Order**, **System Settings**)
- _Italics_: Field labels. (e.g. _First Name_, _Posting Date_). Convert field names in snake case to field labels in title case.
- "Quotes": Report names or button names. (e.g. "Update Items", "Create")
- `Code`: Code snippets, field names, or branch names. (e.g. `posting_date`, `version-15`)

Note: Each DocType has different views, such as list, form, report, dashboard, kanban, calendar, gantt, tree, map, etc.

Please be careful to capture the actual changes of the code. Don't get distracted by wrong or incomplete information in the PR description, commit messages, or issue description.

Respond with only the sentence(s) for the change log.

**Examples:**

The following list in this section is **just an example**. **Do not include** this in the response.

- Enables Team admins to accept or reject bookings that require team confirmation; previously, only the booked member could do this.
- Adds an option to skip creating new **Contact** records in Salesforce integration
- Adds URL validation to _Booking Question_ field for collecting website information
- Adds new **Phone Call** templates for lead qualification and dentist appointments
- Prevents duplicate _Username_ creation within an **Organization**
- Fixes issue preventing **Team Members** from leaving their **Team**
- Reduces redundancy in "General Ledger" report and ensures proper remark updates before submission
- Fixes _Default Advance Account_ field handling in **Process Payment Reconciliation** form
- Updates **Payment Request** to correctly process _Title_, _Description_, and _Payer Name_ fields in Razorpay transactions

## Format

For the resulting changelog, follow this format:

```md
# Release Notes

## New features

(List all new features here. If there are no new features, remove this section)

## Improvements

(List all improvements here. If there are no improvements, remove this section)


## Bug fixes

(List all bug fixes here. If there are no bug fixes, remove this section)

## Other changes

(List all miscellaneous changes here.)

```

## Commit list
