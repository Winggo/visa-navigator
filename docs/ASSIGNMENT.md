# Lighthouse Take-Home Assignment - Problem Statement

Copied from https://scientific-marsupial-c6e.notion.site/Engineering-Assessment-2c24d8890f8480c0802ae03a5f96c4f3


## Problem

Customers find onboarding (data intake) overwhelming and confusing. Giving context about what information we need, where it's used in the case, and why it matters is difficult. Our current solution—long text blocks plus emails/calls—doesn't scale and users don't read it.


## Background: What is a Case Strategy?

An O-1 visa requires applicants to demonstrate "extraordinary ability" by satisfying at least 3 of 8 criteria defined by USCIS (e.g., High Remuneration, Original Contributions, Critical Role, Membership in distinguished organizations, etc.). You can read more about the criteria [here](https://www.uscis.gov/working-in-the-united-states/temporary-workers/o-1-visa-individuals-with-extraordinary-ability-or-achievement).

A **case strategy** is our assessment of which criteria a specific applicant is best positioned to satisfy, based on their background. For example, a founding engineer at a startup might have a case strategy targeting:

- **Critical Role** — their leadership on core product initiatives
- **High Remuneration** — above-market salary and equity
- **Original Contributions** — novel technical work with industry impact

The case strategy determines what evidence we need to collect. **Different people with different backgrounds will have different strategies, and the onboarding experience should adapt accordingly.**


## Your Task

Build a working prototype that collects immigration case information while educating users about their visa and what "good" evidence looks like based on their experience. This prompt is intentionally underspecified. We want to see how you navigate that—whether by making assumptions, asking questions, or both.


## Requirements

Your prototype should:

- **Work for any O-1 case strategy** — We've provided test data below, but design for any permutation of the [O-1 Criteria](https://www.uscis.gov/working-in-the-united-states/temporary-workers/o-1-visa-individuals-with-extraordinary-ability-or-achievement). Assume case strategies follow the format "[Criteria] - [Description]"
- **Validate inputs dynamically** — Real responses to user input, not mocked paths
- **Support clarifying questions** — Users should be able to ask questions/request additional information at any point
- **Collect all data points** listed in the Test Data section


### Bonus points:

- Demonstrate how the system adapts to different user profiles/experiences
- Handle "pushback" scenarios where a case manager would reject insufficient evidence and prompt the user to resubmit


## What We're Looking For

We want to understand how you think, not how you code.

The stack doesn't matter—use whatever you're fastest with. Scaffold it with AI if you want. We're not grading your engineering choices.

We're evaluating:

- **UX Thinking** — Does the experience feel intuitive and supportive for a stressed, confused user?
- **Problem Decomposition** — How did you break down an ambiguous problem? What assumptions did you make, and how did you validate them?
- **Communication** — How clearly you explain your thinking in the walkthrough.

This problem is intentionally open-ended. There's no right answer, and we expect different approaches. Document your assumptions and if needed, tell us what you'd do differently with more time.


## Deliverables

1. Deployed link
2. GitHub repo
3. Brief walkthrough (video or written) explaining your approach + assumptions

Feel free to ask us clarifying questions about the problem space, user behaviors we've observed, or what we've tried before.
---


## Test Data

A truncated case strategy for a sample candidate:


### Demographic Information

| Field | Type |
| --- | --- |
| Legal Name | Text |
| Passport | File |
| Country of Birth | Text |
| Current Visa | Text |
| Foreign/U.S Address | Text |


### Critical Role — Founding Engineer at Bland

| Field | Type |
| --- | --- |
| Start and end dates | Dates |
| Key responsibilities | Text |
| Examples (product roadmaps, technical diagrams, speaking invites, blog posts, dashboards showing project ownership) | Files, URLs |


### High Remuneration — Founding Engineer at Bland

| Field | Type |
| --- | --- |
| Work location | Text |
| Salary with currency | Text |
| Last 4 paystubs | Files |
| Equity/Carta screenshot | Files, URLs |


### Original Contributions — Bland

| Field | Type |
| --- | --- |
| Describe your work and unique contributions | Text |
| Describe the impact to the field/world | Text |
| Supporting evidence | Files, URLs |


### Membership — Y Combinator

| Field | Type |
| --- | --- |
| Date selected | Date |
| Proof of membership | Files, URLs |
---


## Test Data (JSON)

This is provided for ease of use; You do not need to stick to this format. 

```json
{
  "demographic_information": {
    "legal_name": { "type": "text" },
    "passport": { "type": "file" },
    "country_of_birth": { "type": "text" },
    "current_visa": { "type": "text" },
    "address": { "type": "text" }
  },
  "criteria": [
    {
      "name": "Critical Role",
      "description": "Founding Engineer at Bland",
      "fields": [
        { "name": "start_date", "type": "date" },
        { "name": "end_date", "type": "date" },
        { "name": "key_responsibilities", "type": "text" },
        {
          "name": "examples",
          "type": "files_or_urls",
          "hint": "Product roadmaps, technical diagrams, speaking invites, blog posts, dashboards showing project ownership"
        }
      ]
    },
    {
      "name": "High Remuneration",
      "description": "Founding Engineer at Bland",
      "fields": [
        { "name": "work_location", "type": "text" },
        { "name": "salary", "type": "text", "hint": "Include currency" },
        { "name": "paystubs", "type": "files", "hint": "Last 4 paystubs" },
        { "name": "equity_proof", "type": "files_or_urls", "hint": "Carta screenshot or equivalent" }
      ]
    },
    {
      "name": "Original Contributions",
      "description": "Bland",
      "fields": [
        { "name": "work_description", "type": "text", "hint": "Describe your work and unique contributions" },
        { "name": "impact_description", "type": "text", "hint": "Describe the impact to the field/world" },
        { "name": "supporting_evidence", "type": "files_or_urls" }
      ]
    },
    {
      "name": "Membership",
      "description": "Y Combinator",
      "fields": [
        { "name": "date_selected", "type": "date" },
        { "name": "proof_of_membership", "type": "files_or_urls" }
      ]
    }
  ]
}
```
