Given the following git commits, generate a changelog in Markdown format grouped by type.

Please create one or two sentences for a change log to describe the following pull request, aimed at non-technical users to help them understand what was changed and why. The sentences should:

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

- Enables Team admins to accept or reject bookings that require team confirmation; previously, only the booked member could do this.
- Adds an option to skip creating new **Contact** records in Salesforce integration
- Adds URL validation to _Booking Question_ field for collecting website information
- Adds new **Phone Call** templates for lead qualification and dentist appointments
- Prevents duplicate _Username_ creation within an **Organization**
- Fixes issue preventing **Team Members** from leaving their **Team**
- Reduces redundancy in "General Ledger" report and ensures proper remark updates before submission
- Fixes _Default Advance Account_ field handling in **Process Payment Reconciliation** form
- Updates **Payment Request** to correctly process _Title_, _Description_, and _Payer Name_ fields in Razorpay transactions