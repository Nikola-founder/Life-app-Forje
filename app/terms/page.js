import { pageMetadata } from "@/lib/seo";
import LegalDoc from "@/components/LegalDoc";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: "The terms that govern your use of Forje Life.",
  path: "/terms",
});

const UPDATED = "27 August 2026";

export default function TermsPage() {
  return (
    <LegalDoc title="Terms of Service" updated={UPDATED}>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and
        use of Forje Life. By creating an account or using the app, you
        agree to these Terms. If you are under the age of majority in your
        jurisdiction, you confirm you have permission from a parent or
        guardian to use the app.
      </p>
      <p className="text-sm bg-[#f1e6d6] border border-[#e0d2be] rounded-lg p-4">
        <strong>Before you publish this policy:</strong> fill in the
        placeholders (legal entity name, governing law, notice address) and
        have it reviewed by a lawyer — this draft is a solid starting point,
        not legal advice.
      </p>

      <section>
        <h2>1. Using Forje Life</h2>
        <p>
          You must provide accurate information when creating an account and
          keep your login credentials confidential. You&apos;re responsible
          for all activity that happens under your account.
        </p>
      </section>

      <section>
        <h2>2. Acceptable use</h2>
        <ul>
          <li>Don&apos;t use the app for anything unlawful or to harm others.</li>
          <li>Don&apos;t attempt to access another user&apos;s data or bypass account security.</li>
          <li>Don&apos;t reverse-engineer, scrape, or resell the service without our written permission.</li>
          <li>Don&apos;t upload content you don&apos;t have the right to share.</li>
        </ul>
      </section>

      <section>
        <h2>3. Your content</h2>
        <p>
          You own the tasks, journal entries, notes, finance records and
          other content you create in Forje Life. You grant us a limited
          license to store and process that content solely to provide the
          app&apos;s features to you, including generating AI journal
          reflections.
        </p>
      </section>

      <section>
        <h2>4. AI-generated content</h2>
        <p>
          Journal reflections and emotion summaries are generated
          automatically by a third-party AI model. They&apos;re intended as
          a reflective aid, not professional medical, psychological, or
          financial advice. If you&apos;re struggling, please reach out to a
          school counselor, trusted adult, or local support service.
        </p>
      </section>

      <section>
        <h2>5. Availability</h2>
        <p>
          We aim to keep Forje Life available and reliable, but we don&apos;t
          guarantee uninterrupted access. We may update, suspend, or
          discontinue features with reasonable notice where practical.
        </p>
      </section>

      <section>
        <h2>6. Termination</h2>
        <p>
          You may stop using the app and request account deletion at any
          time (see our{" "}
          <a href="/privacy">Privacy Policy</a>). We may suspend or terminate
          accounts that violate these Terms.
        </p>
      </section>

      <section>
        <h2>7. Disclaimer &amp; limitation of liability</h2>
        <p>
          Forje Life is provided &quot;as is&quot; without warranties of any
          kind. To the fullest extent permitted by law, [Your Company /
          Legal Entity Name] is not liable for indirect, incidental, or
          consequential damages arising from your use of the app.
        </p>
      </section>

      <section>
        <h2>8. Changes to these Terms</h2>
        <p>
          We may revise these Terms from time to time. Continued use of the
          app after changes take effect means you accept the updated Terms.
        </p>
      </section>

      <section>
        <h2>9. Governing law</h2>
        <p>These Terms are governed by the laws of [Governing Jurisdiction].</p>
      </section>

      <section>
        <h2>10. Contact</h2>
        <p>
          Questions about these Terms? Email{" "}
          <a href="mailto:hello@forje.life">hello@forje.life</a>.
        </p>
      </section>
    </LegalDoc>
  );
}
