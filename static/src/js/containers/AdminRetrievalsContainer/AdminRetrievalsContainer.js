import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import actions from '../../actions'
import AdminRetrievals from '../../components/AdminRetrievals/AdminRetrievals'

const mapStateToProps = state => ({
  retrievals: state.admin.retrievals,
  retrievalsLoading: state.admin.retrievals.isLoading,
  retrievalsLoaded: state.admin.retrievals.isLoaded
})

const mapDispatchToProps = dispatch => ({
  onAdminViewRetrieval: retrievalId => dispatch(actions.adminViewRetrieval(retrievalId)),
  onFetchAdminRetrievals: () => dispatch(actions.fetchAdminRetrievals()),
  onUpdateAdminRetrievalsSortKey: sortKey => dispatch(actions.updateAdminRetrievalsSortKey(sortKey))
})

export class AdminRetrievalsContainer extends Component {
  componentDidMount() {
    const {
      onFetchAdminRetrievals
    } = this.props

    onFetchAdminRetrievals()
  }

  render() {
    const {
      onAdminViewRetrieval,
      onFetchAdminRetrievals,
      onUpdateAdminRetrievalsSortKey,
      retrievals
    } = this.props

    return (
      <AdminRetrievals
        onAdminViewRetrieval={onAdminViewRetrieval}
        onFetchAdminRetrievals={onFetchAdminRetrievals}
        onUpdateAdminRetrievalsSortKey={onUpdateAdminRetrievalsSortKey}
        retrievals={retrievals}
      />
    )
  }
}

AdminRetrievalsContainer.defaultProps = {
  retrievals: {}
}

AdminRetrievalsContainer.propTypes = {
  onAdminViewRetrieval: PropTypes.func.isRequired,
  onFetchAdminRetrievals: PropTypes.func.isRequired,
  onUpdateAdminRetrievalsSortKey: PropTypes.func.isRequired,
  retrievals: PropTypes.shape({})
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminRetrievalsContainer)
)
