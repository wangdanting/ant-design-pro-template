import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const GlobalFooter = ({ className, links, copyright}) => {
  return (
    <div className={classNames(styles.globalFooter, className)}>
      {links && (
        <div className={styles.links}>
          {
            links.map(link => (
              <a
                key={link.key}
                title={link.title}
                target={link.blankTarget ? '_blank' : '_self'}
                href={link.href}
              >
                {link.title}
              </a>
            ))
          }
        </div>
      )}
        {copyright && <div className={styles.copyright}>{copyright}</div>}
    </div>
  )
};

export default GlobalFooter;