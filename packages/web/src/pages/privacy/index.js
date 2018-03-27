import React from 'react';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import Layout from 'layouts/Layout/Layout';
import Header from 'pages/components/Header/Header';

const styles = theme => ({
  root: {
    padding: [
      theme.spacing.unit,
      theme.spacing.unit * 2,
      theme.spacing.unit * 5,
    ],
  },
  title: {
    margin: [theme.spacing.unit * 2, 0],
    fontSize: theme.typography.display2.fontSize,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: theme.typography.subheading.fontSize,
    fontWeight: theme.typography.fontWeightBold,
  },
  list: {
    marginBottom: 0,
  },
  modified: {
    fontStyle: 'italic',
  },
});

const Privacy = ({ classes }) => (
  <Layout header={Header} fixed>
    <div className={classes.root}>
      <Typography className={classes.title} variant="headline">
        Privacy Policy
      </Typography>
      <Typography paragraph>
        This privacy policy has been compiled to better serve those who are
        concerned with how their &quot;Personally Identifiable Information&quot;
        (PII) is being used online. PII, as described in US privacy law and
        information security, is information that can be used on its own or with
        other information to identify, contact, or locate a single person, or to
        identify an individual in context. Please read our privacy policy
        carefully to get a clear understanding of how we collect, use, protect
        or otherwise handle your Personally Identifiable Information in
        accordance with our website.
      </Typography>
      <Typography className={classes.sectionTitle}>
        What personal information do we collect from the people that visit our
        blog, website or app?
      </Typography>
      <Typography paragraph>
        When ordering or registering on our site, as appropriate, you may be
        asked to enter your name, email address, phone number or other details
        to help you with your experience.
      </Typography>
      <Typography className={classes.sectionTitle}>
        When do we collect information?
      </Typography>
      <Typography paragraph>
        We collect information from you when you register on our site or enter
        information on our site, and when you provide us with feedback on our
        products or services
      </Typography>
      <Typography className={classes.sectionTitle}>
        How do we use your information?
      </Typography>
      <Typography paragraph>
        We may use the information we collect from you when you register, make a
        purchase, sign up for our newsletter, respond to a survey or marketing
        communication, surf the website, or use certain other site features in
        the following ways:
        <ol className={classes.list}>
          <li>
            To personalize your experience and to allow us to deliver the type
            of content and product offerings in which you are most interested.
          </li>
          <li>To quickly process your transactions.</li>
          <li>To ask for ratings and reviews of services or products</li>
        </ol>
      </Typography>
      <Typography className={classes.sectionTitle}>
        How do we protect your information?
      </Typography>
      <Typography paragraph>
        <ol className={classes.list}>
          <li>
            We do not use vulnerability scanning and/or scanning to PCI
            standards.
          </li>
          <li>
            An external PCI compliant payment gateway handles all CC
            transactions.
          </li>
          <li>We use regular Malware Scanning.</li>
        </ol>
        Your personal information is contained behind secured networks and is
        only accessible by a limited number of persons who have special access
        rights to such systems, and are required to keep the information
        confidential. In addition, all sensitive/credit information you supply
        is encrypted via Secure Socket Layer (SSL) technology. We implement a
        variety of security measures when a user places an order enters,
        submits, or accesses their information to maintain the safety of your
        personal information. All transactions are processed through a gateway
        provider and are not stored or processed on our servers.
      </Typography>
      <Typography className={classes.sectionTitle}>
        Do we use cookies?
      </Typography>
      <Typography paragraph>
        Yes. Cookies are small files that a site or its service provider
        transfers to your computer&apos;s hard drive through your Web browser
        (if you allow) that enables the site&apos;s or service provider&apos;s
        systems to recognize your browser and capture and remember certain
        information. For instance, we use cookies to help us remember and
        process the items in your shopping cart. They are also used to help us
        understand your preferences based on previous or current site activity,
        which enables us to provide you with improved services. We also use
        cookies to help us compile aggregate data about site traffic and site
        interaction so that we can offer better site experiences and tools in
        the future.
        <br />
        We use cookies to understand and save user&apos;s preferences for future
        visits.
      </Typography>
      <Typography paragraph>
        You can choose to have your computer warn you each time a cookie is
        being sent, or you can choose to turn off all cookies. You do this
        through your browser settings. Since browser is a little different, look
        at your browser&apos;s Help Menu to learn the correct way to modify your
        cookies.
        <br />
        If you turn cookies off, Some of the features that make your site
        experience more efficient may not function properly.It won&apos;t affect
        the user&apos;s experience that make your site experience more efficient
        and may not function properly.
      </Typography>
      <Typography className={classes.sectionTitle}>
        Third-party disclosure
      </Typography>
      <Typography paragraph>
        We do not sell, trade, or otherwise transfer to outside parties your
        Personally Identifiable Information unless we provide users with advance
        notice. This does not include website hosting partners and other parties
        who assist us in operating our website, conducting our business, or
        serving our users, so long as those parties agree to keep this
        information confidential. We may also release information when it&apos;s
        release is appropriate to comply with the law, enforce our site
        policies, or protect ours or others&apos; rights, property or safety.
        However, non-personally identifiable visitor information may be provided
        to other parties for marketing, advertising, or other uses.
      </Typography>
      <Typography className={classes.sectionTitle}>
        Third-party links
      </Typography>
      <Typography paragraph>
        Occasionally, at our discretion, we may include or offer third-party
        products or services on our website. These third-party sites have
        separate and independent privacy policies. We therefore have no
        responsibility or liability for the content and activities of these
        linked sites. Nonetheless, we seek to protect the integrity of our site
        and welcome any feedback about these sites.
      </Typography>
      <Typography className={classes.sectionTitle}>Google</Typography>
      <Typography paragraph>
        Google&apos;s advertising requirements can be summed up by Google&apos;s
        Advertising Principles. They are put in place to provide a positive
        experience for users.
        https://support.google.com/adwordspolicy/answer/1316548?hl=en
        <br />
        We use Google AdSense Advertising on our website.
        <br />
        Google, as a third-party vendor, uses cookies to serve ads on our site.
        Google&apos;s use of the DART cookie enables it to serve ads to our
        users based on previous visits to our site and other sites on the
        Internet. Users may opt-out of the use of the DART cookie by visiting
        the Google Ad and Content Network privacy policy.
      </Typography>
      <Typography paragraph>
        We have implemented the following:
        <ol className={classes.list}>
          <li>Google Display Network Impression Reporting</li>
          <li>Demographics and Interests Reporting</li>
        </ol>
        <br />
        We, along with third-party vendors such as Google use first-party
        cookies (such as the Google Analytics cookies) and third-party cookies
        (such as the DoubleClick cookie) or other third-party identifiers
        together to compile data regarding user interactions with ad impressions
        and other ad service functions as they relate to our website.
      </Typography>
      <Typography paragraph>
        <u>Opting out:</u> Users can set preferences for how Google advertises
        to you using the Google Ad Settings page. Alternatively, you can opt out
        by visiting the Network Advertising Initiative Opt Out page or by using
        the Google Analytics Opt Out Browser add on.
      </Typography>
      <Typography className={classes.sectionTitle}>
        California Online Privacy Protection Act
      </Typography>
      <Typography paragraph>
        CalOPPA is the first state law in the nation to require commercial
        websites and online services to post a privacy policy. The law&apos;s
        reach stretches well beyond California to require any person or company
        in the United States (and conceivably the world) that operates websites
        collecting Personally Identifiable Information from California consumers
        to post a conspicuous privacy policy on its website stating exactly the
        information being collected and those individuals or companies with whom
        it is being shared. - See more at:
        http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf
        <br />
        According to CalOPPA, we agree to the following:
        <ul className={classes.list}>
          <li>Users can visit our site anonymously.</li>
          <li>
            Once this privacy policy is created, we will add a link to it on our
            home page or as a minimum, on the first significant page after
            entering our website.
          </li>
          <li>
            Our Privacy Policy link includes the word &quot;Privacy&quot; and
            can easily be found on the page specified above.
          </li>
          <li>
            You will be notified of any Privacy Policy changes, on our Privacy
            Policy page.
          </li>
          <li>
            You can change your personal information by logging in to your
            account.
          </li>
        </ul>
      </Typography>
      <Typography className={classes.sectionTitle}>
        How does our site handle Do Not Track signals?
      </Typography>
      <Typography paragraph>
        We honor Do Not Track signals and Do Not Track, plant cookies, or use
        advertising when a Do Not Track (DNT) browser mechanism is in place.
      </Typography>
      <Typography className={classes.sectionTitle}>
        Does our site allow third-party behavioral tracking?
      </Typography>
      <Typography paragraph>
        We allow third-party behavioral tracking
      </Typography>
      <Typography className={classes.sectionTitle}>
        COPPA (Children Online Privacy Protection Act)
      </Typography>
      <Typography paragraph>
        When it comes to the collection of personal information from children
        under the age of 13 years old, the Children&apos;s Online Privacy
        Protection Act (COPPA) puts parents in control. The Federal Trade
        Commission, United States&apos; consumer protection agency, enforces the
        COPPA Rule, which spells out what operators of websites and online
        services must do to protect children&apos;s privacy and safety online.
        <br />
        We do not specifically market to children under the age of 13 years old.
      </Typography>
      <Typography className={classes.sectionTitle}>
        Fair Information Practices
      </Typography>
      <Typography paragraph>
        The Fair Information Practices Principles form the backbone of privacy
        law in the United States and the concepts they include have played a
        significant role in the development of data protection laws around the
        globe. Understanding the Fair Information Practice Principles and how
        they should be implemented is critical to comply with the various
        privacy laws that protect personal information.
      </Typography>
      <Typography paragraph>
        In order to be in line with Fair Information Practices we will take the
        following responsive action, should a data breach occur:
        <ol className={classes.list}>
          <li>We will notify you via email</li>
          <li>
            We will notify the users via in-site notification, within 7 business
            days.
          </li>
        </ol>
      </Typography>
      <Typography paragraph>
        We also agree to the Individual Redress Principle which requires that
        individuals have the right to legally pursue enforceable rights against
        data collectors and processors who fail to adhere to the law. This
        principle requires not only that individuals have enforceable rights
        against data users, but also that individuals have recourse to courts or
        government agencies to investigate and/or prosecute non-compliance by
        data processors.
      </Typography>
      <Typography className={classes.modified}>
        Last Modified: 22 March 2018
      </Typography>
    </div>
  </Layout>
);

export default withStyles(styles)(Privacy);
