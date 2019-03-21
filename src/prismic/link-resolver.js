/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */

export default function (doc) 
{
  if (doc.isBroken)           		return `/`;
  else if (doc.type === 'homepage') return `/`;
  else if (doc.type === 'project')  return `/project/${doc.uid}`;
  else if (doc.type === 'about')    return `/about/`;
  else if (doc.type === 'workshops') return `/workshops/`;
  else if (doc.type === 'shop')     return `/shop/`;
  else if (doc.type === 'contact')  return `/contact/`;

  else return `/`;
}
