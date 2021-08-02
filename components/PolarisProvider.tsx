import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import Link from "next/link";

export default function PolarisProvider( { children }: { children: any } ) {

  const CustomLinkComponent = ( {
                                  as,
                                  children,
                                  url,
                                  external,
                                  role,
                                  ...rest
                                }: any ) => {
    if ( external ) {
      return <a href={url} target="_blank" rel="noopener noreferrer" {...rest}>{ children }</a>
    } else {
      return (
        <Link href={url} passHref>
          <button {...rest}>{children}</button>
        </Link>
      )
    }
  }

  return <AppProvider i18n={translations}
                      linkComponent={CustomLinkComponent}>
    { children }
  </AppProvider>
}