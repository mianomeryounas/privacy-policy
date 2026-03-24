/**
 * Privacy Policy Rule Engine
 * Deterministic logic to assemble policy sections based on user input.
 * No AI, no external APIs — pure conditional logic only.
 */

const PolicyEngine = {
    /**
     * Generates a complete privacy policy from form data.
     * @param {Object} data - Form data object
     * @returns {string} - Complete privacy policy in Markdown
     */
    generate(data) {
        const sections = [];
        const replacements = this._buildReplacements(data);

        // Header — always included
        sections.push(this._fill(TEMPLATES.header, replacements));

        // Information We Collect
        sections.push(this._buildInfoCollected(data, replacements));

        // How We Use Information
        sections.push(this._buildHowWeUse(data, replacements));

        // Cookies — conditional
        if (data.cookies) {
            sections.push(this._fill(TEMPLATES.cookies, replacements));
        }

        // Third-party services — conditional
        if (data.thirdPartyServices && data.thirdPartyServices.trim()) {
            sections.push(this._buildThirdParty(data, replacements));
        }

        // Data Retention
        sections.push(this._buildDataRetention(data, replacements));

        // Data Sharing
        sections.push(this._buildDataSharing(data, replacements));

        // User Rights — always included
        sections.push(this._fill(TEMPLATES.userRights, replacements));

        // Children's Privacy — conditional on flag
        if (data.childrenPrivacy) {
            sections.push(this._fill(TEMPLATES.childrenPrivacyEnabled, replacements));
        } else {
            sections.push(this._fill(TEMPLATES.childrenPrivacy, replacements));
        }

        // International Transfers — conditional
        if (data.internationalTransfer) {
            sections.push(this._fill(TEMPLATES.internationalTransfers, replacements));
        }

        // Security — always included
        sections.push(this._fill(TEMPLATES.security, replacements));

        // Changes — always included
        sections.push(this._fill(TEMPLATES.changes, replacements));

        // Contact — always included
        sections.push(this._fill(TEMPLATES.contact, replacements));

        return sections.join("\n\n---\n\n");
    },

    /**
     * Builds the placeholder replacement map.
     */
    _buildReplacements(data) {
        const today = new Date();
        const dateStr = today.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        return {
            "{app_name}": this._escape(data.appName || "Our App"),
            "{company_name}": this._escape(data.companyName || "Our Company"),
            "{contact_email}": this._escape(data.contactEmail || "contact@example.com"),
            "{website}": this._escape(data.website || ""),
            "{date}": dateStr,
            "{contact_website}": data.website
                ? `- **Website:** [${this._escape(data.website)}](${this._escape(data.website)})`
                : "",
        };
    },

    /**
     * Builds the "Information We Collect" section.
     */
    _buildInfoCollected(data, replacements) {
        const items = [];
        const selected = data.dataCollected || [];

        for (const key of selected) {
            if (TEMPLATES.dataCollectedItems[key]) {
                items.push(TEMPLATES.dataCollectedItems[key]);
            }
        }

        if (items.length === 0) {
            items.push(
                "- We collect minimal information necessary to provide and improve our Service."
            );
        }

        const filled = this._fill(TEMPLATES.informationCollect, {
            ...replacements,
            "{data_collected_list}": items.join("\n"),
        });

        return filled;
    },

    /**
     * Builds the "How We Use Information" section with conditional clauses.
     */
    _buildHowWeUse(data, replacements) {
        let section = this._fill(TEMPLATES.howWeUse, replacements);

        if (data.analytics) {
            section += this._fill(TEMPLATES.analyticsClause, replacements);
        }

        if (data.ads) {
            section += this._fill(TEMPLATES.adsClause, replacements);
        }

        return section;
    },

    /**
     * Builds the third-party services section.
     */
    _buildThirdParty(data, replacements) {
        const services = data.thirdPartyServices
            .split(/[\n,]+/)
            .map((s) => s.trim())
            .filter((s) => s.length > 0)
            .map((s) => `- ${this._escape(s)}`)
            .join("\n");

        return this._fill(TEMPLATES.thirdPartyServices, {
            ...replacements,
            "{third_party_list}": services || "- None specified",
        });
    },

    /**
     * Builds data retention section.
     */
    _buildDataRetention(data, replacements) {
        const details = data.dataRetention && data.dataRetention.trim()
            ? `**Retention period:** ${this._escape(data.dataRetention)}`
            : "We retain your data for as long as your account is active or as needed to provide you with the Service, comply with our legal obligations, resolve disputes, and enforce our agreements.";

        return this._fill(TEMPLATES.dataRetention, {
            ...replacements,
            "{retention_details}": details,
        });
    },

    /**
     * Builds data sharing section with optional selling disclosure.
     */
    _buildDataSharing(data, replacements) {
        let section = this._fill(TEMPLATES.dataSharing, replacements);

        if (data.dataSelling) {
            section += "\n" + this._fill(TEMPLATES.dataSelling, replacements);
        }

        return section;
    },

    /**
     * Replaces all placeholders in a template string.
     */
    _fill(template, replacements) {
        let result = template;
        for (const [key, value] of Object.entries(replacements)) {
            result = result.replaceAll(key, value);
        }
        return result;
    },

    /**
     * Escapes HTML-sensitive characters to prevent XSS in preview.
     */
    _escape(str) {
        if (typeof str !== "string") return "";
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;");
    },
};

if (typeof window !== "undefined") {
    window.PolicyEngine = PolicyEngine;
}
