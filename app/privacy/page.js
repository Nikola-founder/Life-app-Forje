import { pageMetadata } from "@/lib/seo";
import LegalDoc from "@/components/LegalDoc";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Forje Life collects, uses, stores and protects your personal data.",
  path: "/privacy",
});

const UPDATED = "27 August 2026";

export default function PrivacyPage() {
  return (
    <LegalDoc title="Privacy Policy" updated={UPDATED}>
      <p>
        This Privacy Policy explains what personal data Forje Life
        (&quot;Forje Life&quot;, &quot;we&quot;, &quot;us&quot;) collects when
        you use the app, why we collect it, and the choices you have. By
        creating an account you agree to the collection and use of
        information in line with this policy.
      </p>
      <p className="text-sm bg-[#f1e6d6] border border-[#e0d2be] rounded-lg p-4">
        <strong>Before you publish this policy:</strong> replace the
        placeholders in brackets below (legal entity name, registered
        address, governing jurisdiction, data protection officer contact)
        with your real details, and have it reviewed by a lawyer familiar
        with the regions your students live and board in — this draft is a
        solid starting point, not legal advice.
      </p>

      <section>
        <h2>1. Who we are</h2>
        <p>
          Forje Life is operated by [Your Company / Legal Entity Name], of
          [Registered Address, Country]. For any privacy question, contact
          us at{" "}
          <a href="mailto:hello@forje.life">hello@forje.life</a>.
        </p>
      </section>

      <section>
        <h2>2. Data we collect</h2>
        <ul>
          <li><strong>Account data:</strong> the email address and password you sign up with.</li>
          <li><strong>Tasks &amp; habits:</strong> titles, descriptions, priorities, due dates and completion streaks you enter.</li>
          <li><strong>Journal entries:</strong> mood ratings and the free-text content you write, which may be sent to our AI provider to generate reflections and trend summaries.</li>
          <li><strong>Finance data:</strong> transaction amounts, currencies and categories you record. We do not collect bank or card numbers — you enter figures manually.</li>
          <li><strong>Calendar &amp; health data:</strong> events, sleep, water intake, weight and exercise minutes you choose to log.</li>
          <li><strong>Notes &amp; contacts:</strong> notes you write and contact cards you add (name, relation, phone, email, birthday, boarding house, year).</li>
          <li><strong>Technical data:</strong> IP address, browser type, device type, and pages visited, collected automatically via cookies and analytics (see Section 6).</li>
        </ul>
      </section>

      <section>
        <h2>3. How we use your data</h2>
        <ul>
          <li>To provide, operate and maintain the app&apos;s core features across your devices.</li>
          <li>To generate AI-assisted journal reflections and emotion trend summaries.</li>
          <li>To keep your account secure and prevent unauthorized access.</li>
          <li>To understand aggregate usage and improve the product, where you&apos;ve consented to analytics cookies.</li>
          <li>To communicate essential account or service notices (e.g. password resets).</li>
        </ul>
      </section>

      <section>
        <h2>4. Where your data is stored</h2>
        <p>
          Your data is stored in a Supabase-hosted Postgres database with
          row-level security, so records are only ever readable by the
          account that created them. Journal content you submit for
          AI-generated reflections is processed by our AI provider, Groq, to
          produce the reflection and then handled per Groq&apos;s own data
          processing terms — we do not use your journal content to train any
          model ourselves.
        </p>
      </section>

      <section>
        <h2>5. Data sharing</h2>
        <p>
          We do not sell your personal data. We share data only with the
          service providers that make Forje Life work (hosting, database,
          and AI processing, listed above), each bound by their own data
          protection terms, or where required by law.
        </p>
      </section>

      <section>
        <h2>6. Cookies</h2>
        <p>
          We use strictly necessary cookies to keep you signed in. With your
          consent — given through the cookie banner — we also use analytics
          cookies to understand how the app is used. You can withdraw
          consent at any time by clearing your browser&apos;s local storage
          for this site. See our cookie banner for details.
        </p>
      </section>

      <section>
        <h2>7. Data retention</h2>
        <p>
          We keep your data for as long as your account is active. You can
          delete individual records at any time from within the app. To
          request full account deletion, email{" "}
          <a href="mailto:hello@forje.life">hello@forje.life</a> and we will
          remove your account and associated data within 30 days.
        </p>
      </section>

      <section>
        <h2>8. Your rights</h2>
        <p>
          Depending on where you live, you may have the right to access,
          correct, export, or delete your personal data, and to object to or
          restrict certain processing. To exercise any of these rights,
          contact us at the address above.
        </p>
      </section>

      <section>
        <h2>9. Boarding students and minors</h2>
        <p>
          Forje Life is designed for boarding students, some of whom may be
          under 18. We collect only the data described above and do not
          knowingly sell or share it with third parties for advertising. If
          you are a parent, guardian, or school administrator with questions
          about a student&apos;s account, contact us at the address above.
        </p>
      </section>

      <section>
        <h2>10. Security</h2>
        <p>
          We use industry-standard measures, including encryption in
          transit and per-user database access policies, to protect your
          data. No system is completely secure, and we encourage using a
          strong, unique password.
        </p>
      </section>

      <section>
        <h2>11. Changes to this policy</h2>
        <p>
          We may update this policy from time to time. We&apos;ll update the
          &quot;Last updated&quot; date above and, for material changes,
          notify you within the app.
        </p>
      </section>

      <section>
        <h2>12. Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <a href="mailto:hello@forje.life">hello@forje.life</a>.
        </p>
      </section>
    </LegalDoc>
  );
}
