/**
 * Privacy Policy Template Sections
 * Each section is a static string template with placeholders.
 * The engine selects which sections to include based on user input.
 */

const TEMPLATES = {
  header: `# Privacy Policy for {app_name}

**Last updated:** {date}

This Privacy Policy describes how **{company_name}** ("we," "us," or "our") collects, uses, and shares information about you when you use our application **{app_name}** and related services (collectively, the "Service").

By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use the Service.`,

  informationCollect: `## Information We Collect

We collect the following types of information:

{data_collected_list}`,

  dataCollectedItems: {
    name: "- **Personal Identification Information:** Your name, to personalize your experience and identify your account.",
    email: "- **Email Address:** Your email address, used for account verification, communication, and support.",
    phone: "- **Phone Number:** Your phone number, used for account security, verification, or direct communication.",
    location: "- **Location Data:** Your approximate or precise location, used to provide location-based services and improve relevance.",
    device_info: "- **Device Information:** Information about the device you use, including device model, operating system, unique device identifiers, and mobile network information.",
    usage_data: "- **Usage Data:** Information about how you use the Service, including access times, pages viewed, features used, and referring URLs.",
    camera: "- **Camera Access:** Access to your device camera, used for features that require photo or video capture.",
    microphone: "- **Microphone Access:** Access to your device microphone, used for features that require audio recording.",
    contacts: "- **Contacts:** Access to your contacts list, used to help you connect with others on the Service.",
    storage: "- **Storage/Files:** Access to your device storage, used to save or upload files as part of the Service.",
    financial: "- **Financial Information:** Payment card details or billing information, used to process transactions securely.",
    health: "- **Health Data:** Health-related information you provide, used in accordance with applicable health data regulations.",
    biometric: "- **Biometric Data:** Fingerprint, facial recognition, or other biometric identifiers, used for authentication and security purposes.",
    social_media: "- **Social Media Profiles:** Information from your social media accounts when you link them with our Service.",
    ip_address: "- **IP Address:** Your Internet Protocol address, used for security, analytics, and approximate geolocation.",
  },

  howWeUse: `## How We Use Your Information

We use the information we collect for the following purposes:

- To provide, maintain, and improve the Service
- To personalize your experience
- To communicate with you, including sending updates, security alerts, and support messages
- To monitor and analyze usage trends and preferences
- To detect, investigate, and prevent fraudulent transactions and other illegal activities
- To comply with legal obligations`,

  analyticsClause: `
- To collect analytics data to understand how users interact with the Service and improve its performance`,

  adsClause: `
- To deliver personalized advertisements and measure the effectiveness of ad campaigns`,

  cookies: `## Cookies and Tracking Technologies

We use cookies and similar tracking technologies to track activity on our Service and to hold certain information.

**What are cookies?** Cookies are small data files placed on your device. They help us improve the Service and your experience, track which areas and features are popular, and count visits.

**Types of cookies we use:**

- **Essential Cookies:** Required for the operation of the Service. They enable core functionality such as security, session management, and accessibility.
- **Analytics Cookies:** Allow us to recognize and count the number of visitors, and see how visitors move around the Service. This helps us improve the way the Service works.
- **Preference Cookies:** Used to remember your settings and preferences, providing a more personalized experience.

**Managing cookies:** Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or alert you when cookies are being sent. Note that disabling cookies may affect the functionality of the Service.`,

  thirdPartyServices: `## Third-Party Services

We may employ third-party companies and individuals to facilitate our Service, provide the Service on our behalf, perform Service-related tasks, or assist us in analyzing how our Service is used.

These third parties may have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.

**Third-party services we use include:**

{third_party_list}

We encourage you to review the privacy policies of any third-party services you interact with.`,

  dataRetention: `## Data Retention

We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy.

{retention_details}

When your personal information is no longer needed, we will securely delete or anonymize it. If deletion is not possible (for example, because your information has been stored in backup archives), we will securely store your information and isolate it from any further processing until deletion is possible.`,

  dataSharing: `## Data Sharing and Disclosure

We do not sell, trade, or rent your personal identification information to others, except as described in this Privacy Policy.

We may share your information in the following circumstances:

- **With your consent:** We may share your information when you give us explicit permission.
- **For legal reasons:** We may disclose your information if required to do so by law, or in response to valid requests by public authorities (e.g., a court or government agency).
- **Business transfers:** If we are involved in a merger, acquisition, or asset sale, your personal information may be transferred. We will provide notice before your information is transferred and becomes subject to a different privacy policy.
- **Service providers:** We may share your information with third-party vendors who assist us in operating the Service, conducting our business, or serving users, so long as they agree to keep your information confidential.`,

  dataSelling: `
### Sale of Personal Data

We may sell or share certain categories of your personal data with third parties for business or commercial purposes. Under applicable data protection laws (such as the California Consumer Privacy Act), you have the right to opt out of the sale of your personal data. To exercise this right, please contact us using the information provided below.`,

  userRights: `## Your Rights

Depending on your location and applicable laws, you may have the following rights regarding your personal information:

- **Access:** You can request a copy of the personal information we hold about you.
- **Correction:** You can request that we correct any inaccurate or incomplete personal information.
- **Deletion:** You can request that we delete your personal information, subject to certain exceptions.
- **Data Portability:** You can request a copy of your data in a structured, commonly used, and machine-readable format.
- **Objection:** You can object to the processing of your personal information in certain circumstances.
- **Restrict Processing:** You can request that we restrict the processing of your personal information.
- **Withdraw Consent:** Where we rely on your consent to process your personal information, you can withdraw that consent at any time.

To exercise any of these rights, please contact us at **{contact_email}**. We will respond to your request within a reasonable timeframe and in accordance with applicable law.`,

  childrenPrivacy: `## Children's Privacy

Our Service is not intended for use by children under the age of 13 (or the applicable age of consent in your jurisdiction).

We do not knowingly collect personally identifiable information from children under 13. If we become aware that we have collected personal information from a child under the age of 13 without verification of parental consent, we will take steps to remove that information from our servers.

If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us at **{contact_email}** so that we can take the necessary actions.`,

  childrenPrivacyEnabled: `## Children's Privacy

Our Service may collect information from children under the age of 13 (or the applicable age of consent in your jurisdiction). We take additional steps to protect children's privacy, including:

- Obtaining verifiable parental consent before collecting personal information from children
- Limiting the collection of personal information from children to what is reasonably necessary
- Providing parents with access to their child's personal information and the ability to request its deletion

We comply with applicable laws and regulations regarding children's privacy, including the Children's Online Privacy Protection Act (COPPA) where applicable.

If you are a parent or guardian and have questions about our practices regarding children's data, please contact us at **{contact_email}**.`,

  internationalTransfers: `## International Data Transfers

Your information may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.

If you are located outside of the country where our servers are based, please be aware that your information may be transferred to, stored, and processed by us and our service providers in other countries.

We take appropriate safeguards to ensure that your personal information remains protected in accordance with this Privacy Policy, including:

- Implementing standard contractual clauses approved by relevant authorities
- Ensuring that third-party service providers comply with equivalent data protection standards
- Applying technical and organizational security measures to protect your data during transfer`,

  security: `## Security

The security of your personal information is important to us. We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.`,

  changes: `## Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.

You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

Your continued use of the Service after any modifications to this Privacy Policy will constitute your acknowledgment of the modifications and your consent to abide by the modified Privacy Policy.`,

  contact: `## Contact Us

If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:

- **Company:** {company_name}
- **App:** {app_name}
- **Email:** {contact_email}
{contact_website}`,
};

// Make available globally
if (typeof window !== "undefined") {
  window.TEMPLATES = TEMPLATES;
}
